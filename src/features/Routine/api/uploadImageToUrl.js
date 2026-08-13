export const uploadImageToUrl = async ({ url, file }) => {
  if (!url) {
    throw new Error("업로드 URL이 없습니다.");
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file?.type || "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("파일 업로드에 실패했습니다.");
  }

  return response;
};
