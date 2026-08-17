import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const getHomeRecord = async () => {
  const isMock = isMockMode();
  if (isMock) {
    const { homeRecordMockup } = await import("@/mockup/homeRecordMockup");
    return homeRecordMockup;
  }

  const res = await api.get(`/records?limit=3`);
  return res.data.item || [];
};
