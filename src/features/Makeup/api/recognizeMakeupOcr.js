import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const recognizeMakeupOcr = async ({ storagePath, alias = "직구 세럼" }) => {
  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      alias,
      ingredients: [
        { standardName: "정제수", matched: true },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "부틸렌글리이콜", matched: false, rawName: "부틸렌글리이콜" },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "부틸렌글리이콜", matched: false, rawName: "부틸렌글리이콜" },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "부틸렌글리이콜", matched: false, rawName: "부틸렌글리이콜" },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "부틸렌글리이콜", matched: false, rawName: "부틸렌글리이콜" },
        { standardName: "나이아신아마이드", matched: true },
        { standardName: "부틸렌글리이콜", matched: false, rawName: "부틸렌글리이콜" },
      ],
      matchedCount: 2,
      totalCount: 3,
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
