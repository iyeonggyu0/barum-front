import api from "@/api";

export const deleteRecordDetails = async (date) => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    // 스켈레톤 UI / 로딩 테스트를 위한 1초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }

  // DELETE /records/{date} 호출
  const res = await api.delete(`/records/${date}`);
  return res.data;
};
