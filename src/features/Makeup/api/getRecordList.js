import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const getMakeupList = async () => {
  const isMock = isMockMode();

  if (isMock) {
    const { makeupMockup } = await import("@/mockup/makeupMockup");
    // 스켈레톤 UI 테스트를 위한 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return makeupMockup.items;
  }

  const res = await api.get(`/products`);
  return res.data.items || [];
};
