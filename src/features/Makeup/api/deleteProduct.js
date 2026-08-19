import api from "@/api";

export const deleteProduct = async (productId) => {
  if (!productId) {
    throw { code: "VALIDATION_ERROR", message: "삭제할 제품 정보가 없습니다." };
  }

  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { ok: true };
  }

  await api.delete(`/products/${productId}`);
  return { ok: true };
};
