import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

const getTodayKstDate = () => {
  const now = new Date();
  const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().slice(0, 10);
};

const normalizeApiError = (error, fallbackCode = "EXTERNAL_API_ERROR", fallbackMessage = "요청 중 오류가 발생했습니다.") => {
  const code = error?.response?.data?.code || (error?.response?.status === 401 ? "UNAUTHORIZED" : null) || error?.code || fallbackCode;
  const message = error?.response?.data?.message || error?.message || fallbackMessage;

  return { code, message };
};

const buildSavePayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw { code: "VALIDATION_ERROR", message: "저장할 루틴 데이터가 올바르지 않습니다." };
  }

  const nextPayload = {
    date: payload.date || getTodayKstDate(),
    weather: payload.weather ?? undefined,
    skin: payload.skin ?? undefined,
    routine: payload.routine ?? { apply: [], skip: [] },
    conflicts: Array.isArray(payload.conflicts) ? payload.conflicts : [],
  };

  if (payload.selfiePath) {
    const selfiePath = String(payload.selfiePath).trim();
    if (!/^.+\/.+$/i.test(selfiePath)) {
      throw {
        code: "INVALID_SELFIE_PATH",
        message: "셀카 경로 형식이 올바르지 않습니다. 다시 촬영해 주세요.",
      };
    }

    nextPayload.selfiePath = selfiePath;
  }

  if (!nextPayload.weather) delete nextPayload.weather;
  if (!nextPayload.skin) delete nextPayload.skin;
  if (!nextPayload.routine || (!nextPayload.routine.apply?.length && !nextPayload.routine.skip?.length)) {
    delete nextPayload.routine;
  }
  if (!nextPayload.conflicts?.length) {
    nextPayload.conflicts = [];
  }

  return nextPayload;
};

export const saveRoutineRecord = async ({ payload }) => {
  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { date: payload?.date || getTodayKstDate() };
  }

  try {
    const normalizedPayload = buildSavePayload(payload);
    const response = await api.post("/records", normalizedPayload);

    return response.data;
  } catch (error) {
    if (error?.code === "INVALID_SELFIE_PATH") {
      throw error;
    }

    const message = error?.response?.data?.message || error?.message || "";
    if (error?.response?.status === 502 || error?.code === "ERR_BAD_RESPONSE" || /Unexpected end of JSON|JSON.*parse/i.test(message)) {
      throw { code: "BAD_REQUEST", message: "기록 응답이 올바르지 않아 저장을 완료할 수 없어요." };
    }

    throw normalizeApiError(error, "EXTERNAL_API_ERROR", "기록 저장 중 오류가 발생했습니다.");
  }
};
