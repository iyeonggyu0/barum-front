// src/api/routineAi.js
export const fetchRoutineStream = async (selfiePath, lat, lon, token) => {
  const baseUrl = import.meta.env.VITE_API_AI_BASE_URL;
  const bodyData = { lat, lon };

  // selfiePath가 존재하고 'none'이 아닐 때만 객체에 추가
  if (selfiePath && selfiePath !== "none") {
    bodyData.selfiePath = selfiePath;
  }

  const response = await fetch(`${baseUrl}/internal/v1/routines/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      code: errorData.code || "EXTERNAL_API_ERROR",
      message: errorData.message || "API 요청 중 오류가 발생했습니다.",
    };
  }

  if (!response.body) {
    throw {
      code: "EXTERNAL_API_ERROR",
      message: "스트림 본문을 읽을 수 없습니다.",
    };
  }

  return response.body;
};
