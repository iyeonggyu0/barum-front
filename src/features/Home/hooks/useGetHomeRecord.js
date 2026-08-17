// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHomeRecord } from "../api/getHomeRecord";

const QUERY_KEY = ["home_record"];

// 오버뷰 조회 훅
/**
 *   const {
    data: departmentList,
    isLoading: isDepartmentListLoading,
    isError: isDepartmentListError,
  } = useGetHomeRecord({
    enabled: !!selectedUniv,
  });
  
 * @param {*} path
 * @returns { data: cert, isLoading: isCertLoading, isError: isCertError }
 */
export const useGetHomeRecord = (path, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEY, path],
    queryFn: getHomeRecord,
    ...options,
  });
};
