import api from "@/api";

export const getHomeRecord = async () => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { homeRecordMockup } = await import("@/mockup/homeRecordMockup.js");
    return homeRecordMockup;
  }

  const res = await api.get(`/records?limit=3`);
  return res.data.item || [];
};
