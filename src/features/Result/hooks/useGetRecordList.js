import { useQuery } from "@tanstack/react-query";
import { getRecordDetails } from "../api/getRecordDetails";

const QUERY_KEY = "record_details";

/**
 * 특정 날짜의 기록 상세 정보를 조회하는 커스텀 훅
 *
 * @param {string} date - 조회할 기록의 날짜
 * @param {object} [options={}] - useQuery 추가 옵션 (optional)
 *
 * @returns {object} React Query 반환 객체
 * @property {any} data - API에서 성공적으로 받아온 실제 데이터 (초기값: undefined)
 * @property {boolean} isLoading - 캐시된 데이터가 없는 상태에서의 최초 로딩 여부
 * @property {boolean} isFetching - 백그라운드 갱신을 포함하여 API 통신이 진행 중인지 여부
 * @property {boolean} isError - API 호출 중 에러 발생 여부
 * @property {Error} error - 발생한 에러 객체 (error.message 활용)
 * @property {boolean} isSuccess - 데이터를 성공적으로 가져왔는지 여부
 * @property {Function} refetch - 수동으로 API를 다시 호출할 수 있는 함수
 */
export const useGetRecordDetails = (date, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY, date], // ["record_details", date] 로 예쁘게 평탄화됨
    queryFn: () => getRecordDetails(date),
    enabled: !!date, // date 값이 있을 때만 API 호출
    ...options,
  });
};
