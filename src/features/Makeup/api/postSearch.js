import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const postSearch = async (catalogIds) => {
  const isMock = isMockMode();

  if (isMock) {
    // 테스트용 1초 딜레이 및 Mock 데이터 반환
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      added: catalogIds.length,
      sampleCleared: true, // 테스트를 위해 true로 설정
      items: catalogIds.map((id, idx) => ({
        productId: `mock-product-id-${idx}`,
        name: `카탈로그 제품 ${id}`,
      })),
    };
  }

  // A의 경우: { "catalogIds": [...] } 형태로 전송
  const res = await api.post(`/products`, { catalogIds });
  return res.data;
};
