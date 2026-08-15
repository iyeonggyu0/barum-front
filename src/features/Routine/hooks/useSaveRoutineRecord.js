import { useMutation } from "@tanstack/react-query";
import { useAnonymousAuth } from "@/hooks/useAnonymousAuth";
import { isMockMode } from "@/utils/isMockMode";
import { saveRoutineRecord } from "../api/saveRoutineRecord";

const isUnauthorized = (error) => {
  return error?.code === "UNAUTHORIZED" || error?.response?.status === 401;
};

export const useSaveRoutineRecord = () => {
  const { getAuthToken } = useAnonymousAuth();

  return useMutation({
    mutationFn: async (payload) => {
      if (isMockMode()) {
        return await saveRoutineRecord({ payload });
      }

      try {
        const { token } = await getAuthToken();
        return await saveRoutineRecord({ payload, token });
      } catch (firstError) {
        if (!isUnauthorized(firstError)) {
          throw firstError;
        }

        // 401 시 익명 세션 재발급 후 1회 재시도
        const { token } = await getAuthToken();
        return await saveRoutineRecord({ payload, token });
      }
    },
  });
};
