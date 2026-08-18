import { useMutation } from "@tanstack/react-query";

import { getRoutineUploadUrl } from "../api/getUploadUrl";
import { uploadImageToUrl } from "../api/uploadImageToUrl";

export const useRoutineImageUpload = () => {
  return useMutation({
    mutationFn: async ({ file, purpose = "SELFIE" }) => {
      if (import.meta.env.VITE_USE_MOCKUP === "true") {
        return {
          bucket: purpose === "OCR" ? "labels" : "selfies",
          storagePath: "mock-user/2026-08-14.jpg",
          expiresIn: 300,
        };
      }

      if (!file) {
        throw { code: "VALIDATION_ERROR", message: "업로드할 이미지가 없습니다." };
      }

      const { uploadUrl, bucket, storagePath, expiresIn } = await getRoutineUploadUrl({ purpose });
      await uploadImageToUrl({ uploadUrl, file });

      return {
        bucket,
        storagePath,
        expiresIn,
      };
    },
  });
};
