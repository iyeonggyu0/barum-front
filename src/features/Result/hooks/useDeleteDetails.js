import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecordDetails } from "../api/deleteRecordDetails";

const QUERY_KEY = "record_details";

/**
 * 특정 날짜의 기록 상세 정보를 삭제하는 커스텀 훅
 *
 * @param {string} date - 삭제할 기록의 날짜
 * @param {object} [options={}] - useMutation 추가 옵션 (optional, ex: onSuccess, onError)
 *
 * @returns {object} React Query 반환 객체
 * @property {Function} mutate - 삭제 API를 실행하는 함수
 * @property {Function} mutateAsync - Promise를 반환하는 비동기 삭제 함수
 * @property {boolean} isPending - API 호출이 진행 중인지 여부 (v5 기준, v4는 isLoading)
 * @property {boolean} isError - API 호출 중 에러 발생 여부
 * @property {Error} error - 발생한 에러 객체
 * @property {boolean} isSuccess - 삭제를 성공적으로 완료했는지 여부
 */
export const useDeleteDetails = (date, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutate 함수가 호출되면 이 함수가 실행
    mutationFn: () => deleteRecordDetails(date),

    // 삭제 성공 시 실행할 로직
    onSuccess: (data, variables, context) => {
      // (이후 다시 해당 날짜를 조회하면 서버에서 최신 상태를 불러옵니다)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, date] });
      // queryClient.invalidateQueries({ queryKey: ["record_list"] });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
