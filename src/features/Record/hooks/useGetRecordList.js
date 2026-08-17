import { useQuery } from "@tanstack/react-query";
import { getRecordList } from "../api/getRecordList";

const QUERY_KEY = ["record_list"];

export const useGetRecordList = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getRecordList,
    ...options,
  });
};
