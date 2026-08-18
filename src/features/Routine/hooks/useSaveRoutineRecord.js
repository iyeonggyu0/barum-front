import { useMutation } from "@tanstack/react-query";

import { saveRoutineRecord } from "../api/saveRoutineRecord";

export const useSaveRoutineRecord = () => {
  return useMutation({
    mutationFn: async (payload) => {
      if (import.meta.env.VITE_USE_MOCKUP === "true") {
        return await saveRoutineRecord({ payload });
      }

      return await saveRoutineRecord({ payload });
    },
  });
};
