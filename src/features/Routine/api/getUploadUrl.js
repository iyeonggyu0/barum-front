import api from "@/api";

export const getRoutineUploadUrl = async ({ purpose = "SELFIE" } = {}) => {
  try {
    const response = await api.post("/uploads", { purpose });
    return response.data || {};
  } catch (error) {
    throw {
      code: error?.response?.data?.code || (error?.response?.status === 401 ? "UNAUTHORIZED" : "EXTERNAL_API_ERROR"),
      message: error?.response?.data?.message || "업로드 URL 발급에 실패했습니다.",
    };
  }
};
