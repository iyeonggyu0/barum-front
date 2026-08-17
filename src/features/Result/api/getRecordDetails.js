import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const getRecordDetails = async (date) => {
  const isMock = isMockMode();
  if (isMock) {
    const { recordDetailsMockup } = await import("@/mockup/recordDetailsMockup");
    // 스켈레톤 UI 테스트를 위한 3초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return recordDetailsMockup;
  }

  const res = await api.get(`/records/${date}`);
  return res.data.item || [];
};
