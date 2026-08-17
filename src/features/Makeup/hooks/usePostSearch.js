import { useMutation } from "@tanstack/react-query";
import { postSearch } from "../api/postSearch";

export const usePostSearch = (options = {}) => {
  return useMutation({
    mutationFn: (catalogIds) => postSearch(catalogIds),
    ...options,
  });
};
