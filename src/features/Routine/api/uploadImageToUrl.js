export const uploadImageToUrl = async ({ uploadUrl, file }) => {
  if (!uploadUrl) {
    throw { code: "VALIDATION_ERROR", message: "업로드 URL이 없습니다." };
  }

  if (!file) {
    throw { code: "VALIDATION_ERROR", message: "업로드할 이미지가 없습니다." };
  }

  const response = await fetch(uploadUrl, {
    method: "PUT",
    credentials: "omit",
    headers: {
      "Content-Type": file?.type || "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw { code: "EXTERNAL_API_ERROR", message: "파일 업로드에 실패했습니다." };
  }

  return response;
};
