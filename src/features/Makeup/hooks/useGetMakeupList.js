import { useQuery } from "@tanstack/react-query";
import { getMakeupList } from "../api/getRecordList";

const QUERY_KEY = ["makeup_list"];

export const useGetMakeupList = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getMakeupList,
    ...options,
  });
};
