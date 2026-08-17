import { useMutation } from "@tanstack/react-query";
import { getMakeupUploadUrl } from "@/features/Makeup/api/getUploadUrl";
import { uploadImageToUrl } from "@/features/Makeup/api/uploadImageToUrl";
import { recognizeMakeupOcr } from "@/features/Makeup/api/recognizeMakeupOcr";
import { isMockMode } from "@/utils/isMockMode";

export const useMakeupOcrUpload = () => {
  return useMutation({
    mutationFn: async ({ file, alias = "직구 세럼" }) => {
      if (!file) {
        throw { code: "VALIDATION_ERROR", message: "업로드할 이미지가 없습니다." };
      }

      if (isMockMode()) {
        return recognizeMakeupOcr({ storagePath: "mock-user/2026-08-14.jpg", alias });
      }

      const { uploadUrl, storagePath } = await getMakeupUploadUrl({ purpose: "OCR" });
      await uploadImageToUrl({ uploadUrl, file });

      return recognizeMakeupOcr({ storagePath, alias });
    },
  });
};
