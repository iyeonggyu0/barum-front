import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const postOcrProduct = async (ocrProduct) => {
  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      added: 1,
      sampleCleared: true,
      items: [
        {
          productId: "mock-product-id-ocr-0",
          name: ocrProduct?.alias || "사진 등록 제품",
        },
      ],
    };
  }

  const response = await api.post("/products", {
    ocrProduct,
  });

  return response.data;
};
