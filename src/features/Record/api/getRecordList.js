import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

const RECORD_LIMIT = 15;

export const getRecordList = async () => {
  const isMock = isMockMode();

  if (isMock) {
    const { recordMockup } = await import("@/mockup/recordMockup");
    // 스켈레톤 UI 테스트를 위한 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return recordMockup;
  }

  const res = await api.get(`/records?limit=${RECORD_LIMIT}`);
  return res.data.item || [];
};
