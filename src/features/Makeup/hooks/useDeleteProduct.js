import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/features/Makeup/api/deleteProduct";

const QUERY_KEY = ["makeup_list"];

export const useDeleteProduct = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    ...restOptions,
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
  });
};
