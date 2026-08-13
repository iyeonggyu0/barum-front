import api from "@/api";
import { homeRecordMockup } from "@/mockup/homeRecordMockup";
import { isMockMode } from "@/utils/isMockMode";

export const getHomeRecord = async () => {
  const isMock = isMockMode();
  if (isMock) {
    return homeRecordMockup;
  }

  const res = await api.get(`/records?limit=3`);
  return res.data.item || [];
};
