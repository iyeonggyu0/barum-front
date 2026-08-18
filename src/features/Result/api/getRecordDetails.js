import api from "@/api";

const normalizeRecordDetail = (record) => {
  if (!record || typeof record !== "object") {
    return null;
  }

  const normalizedRecord = { ...record };

  if (normalizedRecord.selfiePath) {
    const selfiePath = String(normalizedRecord.selfiePath).trim();
    if (!/^.+\/.+$/i.test(selfiePath)) {
      throw {
        code: "INVALID_SELFIE_PATH",
        message: "셀카 경로 형식이 올바르지 않습니다.",
      };
    }

    normalizedRecord.selfieUrl = `${import.meta.env.VITE_API_IMG_BASE_URL}${selfiePath}`;
  }

  return normalizedRecord;
};

export const getRecordDetails = async (date) => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { recordDetailsMockup } = await import("@/mockup/recordDetailsMockup.js");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return recordDetailsMockup;
  }

  try {
    const res = await api.get(`/records/${date}`);
    const record = res.data?.item ?? res.data ?? null;
    return normalizeRecordDetail(record);
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.message || "";

    if (error?.code === "INVALID_SELFIE_PATH") {
      throw error;
    }

    if (status === 400 || status === 502 || error?.code === "ERR_BAD_RESPONSE" || /Unexpected end of JSON|JSON.*parse/i.test(message)) {
      throw { code: "BAD_REQUEST", message: "기록 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." };
    }

    throw error;
  }
};
