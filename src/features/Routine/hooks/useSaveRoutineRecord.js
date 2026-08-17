import { useMutation } from "@tanstack/react-query";
import { isMockMode } from "@/utils/isMockMode";
import { saveRoutineRecord } from "../api/saveRoutineRecord";

export const useSaveRoutineRecord = () => {
  return useMutation({
    mutationFn: async (payload) => {
      if (isMockMode()) {
        return await saveRoutineRecord({ payload });
      }

      return await saveRoutineRecord({ payload });
    },
  });
};
