import api from "@/api";

export const getMakeupList = async () => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { makeupMockup } = await import("@/mockup/makeupMockup.js");
    // 스켈레톤 UI 테스트를 위한 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return makeupMockup.items;
  }

  const res = await api.get(`/products`);
  return res.data.items || [];
};
