import api from "@/api";

export const getRoutineUploadUrl = async ({ purpose = "SELFIE" } = {}) => {
  const response = await api.post("/uploads", { purpose });
  return response.data || {};
};
