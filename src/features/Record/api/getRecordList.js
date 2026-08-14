import api from "@/api";
import { recordMockup } from "@/mockup/recordMockup";
import { isMockMode } from "@/utils/isMockMode";

const RECORD_LIMIT = 15;

export const getRecordList = async () => {
  const isMock = isMockMode();
  if (isMock) {
    return recordMockup;
  }

  const res = await api.get(`/records?limit=${RECORD_LIMIT}`);
  return res.data.item || [];
};
