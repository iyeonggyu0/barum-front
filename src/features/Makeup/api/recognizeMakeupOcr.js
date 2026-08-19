import api from "@/api";

export const recognizeMakeupOcr = async ({ storagePath, alias = "직구 세럼" }) => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const requestedDelay = Number(import.meta.env.VITE_MOCK_OCR_DELAY_MS ?? 800);
    const mockDelayMs = Number.isFinite(requestedDelay) ? Math.max(0, Math.min(requestedDelay, 3000)) : 800;
    await new Promise((resolve) => setTimeout(resolve, mockDelayMs));
    return {
      alias,
      ingredients: [
        { standardName: "정제수", matched: true },
        { standardName: "글리세린", matched: true },
        { standardName: "부틸렌글라이콜", matched: true },
        { standardName: "1,2-헥산다이올", matched: true },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "판테놀", matched: true },
        { standardName: "병풀추출물", matched: false, rawName: "센텔라아시아티카추출물" },
        { standardName: "소듐하이알루로네이트", matched: true },
        { standardName: "알란토인", matched: true },
        { standardName: "마트리카리아꽃추출물", matched: false, rawName: "캐모마일추출물" },
        { standardName: "에틸헥실글리세린", matched: true },
      ],
      matchedCount: 9,
      totalCount: 11,
    };
  }

  try {
    const response = await api.post("/products/ocr", {
      storagePath,
      alias,
    });

    return response.data;
  } catch (error) {
    const responseCode = error?.response?.data?.code;
    const responseMessage = error?.response?.data?.message;

    throw {
      code: responseCode || (error?.response?.status === 422 ? "OCR_NO_TEXT" : "EXTERNAL_API_ERROR"),
      message: responseMessage || "전성분 표 인식에 실패했습니다.",
    };
  }
};
