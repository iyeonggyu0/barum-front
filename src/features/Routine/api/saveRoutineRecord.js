import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

const normalizeApiError = (error, fallbackCode = "EXTERNAL_API_ERROR", fallbackMessage = "요청 중 오류가 발생했습니다.") => {
  const code = error?.response?.data?.code || (error?.response?.status === 401 ? "UNAUTHORIZED" : null) || error?.code || fallbackCode;
  const message = error?.response?.data?.message || error?.message || fallbackMessage;

  return { code, message };
};

export const saveRoutineRecord = async ({ payload, token }) => {
  if (!payload || typeof payload !== "object") {
    throw { code: "VALIDATION_ERROR", message: "저장할 루틴 데이터가 올바르지 않습니다." };
  }

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { date: payload.date || new Date().toISOString().split("T")[0] };
  }

  if (!token) {
    throw { code: "UNAUTHORIZED", message: "인증 토큰이 없습니다." };
  }

  try {
    const response = await api.post("/records", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw normalizeApiError(error, "EXTERNAL_API_ERROR", "기록 저장 중 오류가 발생했습니다.");
  }
};
