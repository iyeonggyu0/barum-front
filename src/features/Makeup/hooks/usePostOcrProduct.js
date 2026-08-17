import { useMutation } from "@tanstack/react-query";
import { postOcrProduct } from "@/features/Makeup/api/postOcrProduct";

export const usePostOcrProduct = (options = {}) => {
  return useMutation({
    mutationFn: (ocrProduct) => postOcrProduct(ocrProduct),
    ...options,
  });
};
