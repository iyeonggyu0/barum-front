import api from "@/api";

const RECORD_LIMIT = 15;

export const getRecordList = async () => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { recordMockup } = await import("@/mockup/recordMockup.js");
    // 스켈레톤 UI 테스트를 위한 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return recordMockup;
  }

  const res = await api.get(`/records?limit=${RECORD_LIMIT}`);
  return res.data.item || [];
};
