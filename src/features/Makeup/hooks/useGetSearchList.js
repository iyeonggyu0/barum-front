import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "../api/getSearchList";
// API 함수 이름도 getSearchList로 변경되었다고 가정했습니다.
// 실제 사용하시는 API 함수명으로 맞춰서 import 해주세요.

// 기본 쿼리 키를 상수로 정의
const QUERY_KEY = "search_list";

export const useGetSearchList = (name, page, category, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY, name, page, category],
    queryFn: () => getSearchList(name, page, category),

    ...options,
  });
};
