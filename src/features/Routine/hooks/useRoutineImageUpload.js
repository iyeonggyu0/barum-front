import { useMutation } from "@tanstack/react-query";
import { isMockMode } from "@/utils/isMockMode";
import { getRoutineUploadUrl } from "../api/getUploadUrl";
import { uploadImageToUrl } from "../api/uploadImageToUrl";

export const useRoutineImageUpload = () => {
  return useMutation({
    mutationFn: async ({ file, purpose = "SELFIE" }) => {
      if (isMockMode()) {
        return {
          uploadUrl: "https://placehold.co/600x400",
          storagePath: "https://placehold.co/600x400",
        };
      }

      if (!file) {
        throw new Error("업로드할 이미지가 없습니다.");
      }

      const { uploadUrl, storagePath } = await getRoutineUploadUrl({ purpose });
      await uploadImageToUrl({ url: uploadUrl, file });

      return {
        uploadUrl,
        storagePath,
      };
    },
  });
};
