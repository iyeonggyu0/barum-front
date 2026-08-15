import { useMutation } from "@tanstack/react-query";
import { isMockMode } from "@/utils/isMockMode";
import { getRoutineUploadUrl } from "../api/getUploadUrl";
import { uploadImageToUrl } from "../api/uploadImageToUrl";

export const useRoutineImageUpload = () => {
  return useMutation({
    mutationFn: async ({ file, purpose = "SELFIE" }) => {
      if (isMockMode()) {
        return {
          bucket: purpose === "OCR" ? "labels" : "selfies",
          storagePath: "mock-user/2026-08-14.jpg",
          expiresIn: 300,
        };
      }

      if (!file) {
        throw new Error("업로드할 이미지가 없습니다.");
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
