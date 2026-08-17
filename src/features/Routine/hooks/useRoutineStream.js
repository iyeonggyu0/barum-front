// src/features/Routine/hooks/useRoutineStream.js
import { isMockMode } from "@/utils/isMockMode";
import { useRef, useState } from "react";
import { fetchRoutineStream } from "../api/routineAi";
import { useAnonymousAuth } from "@/hooks/useAnonymousAuth";
import { getCurrentLocation } from "@/utils/geolocation";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const parseSseChunk = (chunk) => {
  const eventMatch = chunk.match(/^event:\s*(.+)$/m);
  const dataMatch = chunk.match(/^data:\s*(.+)$/m);

  if (!eventMatch || !dataMatch) {
    return null;
  }

  try {
    return {
      event: eventMatch[1].trim(),
      data: JSON.parse(dataMatch[1]),
    };
  } catch {
    return null;
  }
};

const isUnauthorizedError = (error) => {
  return error?.code === "UNAUTHORIZED" || error?.status === 401;
};

export const useRoutineStream = () => {
  const [progress, setProgress] = useState(0);
  const [stage1, setStage1] = useState(false);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);

  const [error, setError] = useState(null);
  const [isProgressing, setIsProgressing] = useState(false);

  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);

  const draftRef = useRef({
    date: "",
    selfiePath: null,
    weather: null,
    skin: null,
    conflicts: [],
    routine: { apply: [], skip: [] },
  });

  // 인증 훅 가져오기
  const { getAuthToken } = useAnonymousAuth();

  const consumeRoutineStream = async ({ stream, userId }) => {
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += value;
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() || "";

      for (const chunk of chunks) {
        const parsed = parseSseChunk(chunk);
        if (!parsed) {
          continue;
        }

        handleEvent(parsed.event, parsed.data, userId);
      }
    }
  };

  // 매개변수를 selfiePath 하나로 축소! (나머지는 훅 내부에서 알아서 가져옴)
  const startStream = async (selfiePath) => {
    const isMock = isMockMode();
    const actualSelfiePath = !selfiePath || selfiePath === "none" ? null : selfiePath;

    setIsProgressing(true);
    setError(null);
    setProgress(0);
    setStage1(false);
    setStage2(false);
    setStage3(false);
    setDataA(null);
    setDataB(null);

    const today = new Date().toISOString().split("T")[0];
    draftRef.current = {
      date: today,
      selfiePath: actualSelfiePath,
      weather: null,
      skin: null,
      conflicts: [],
      routine: { apply: [], skip: [] },
    };

    if (isMock) {
      console.log("🧪 목업 모드: Supabase 인증을 건너뛰고 목업 시퀀스를 실행합니다.");
      const { recordDetailsMockup } = await import("@/mockup/recordDetailsMockup");
      runMockSequence("mock-user-123", actualSelfiePath, recordDetailsMockup);
      return;
    }

    try {
      // 1. 토큰 및 유저 ID 발급
      let { token, userId } = await getAuthToken();

      // 2. GPS 위치 확인 (실패 시 서울시청 기본값 사용)
      let lat = 37.5665;
      let lon = 126.978;
      try {
        const coords = await getCurrentLocation();
        lat = coords.lat;
        lon = coords.lon;
        console.log(`📍 현재 위치 확인 완료: lat(${lat}), lon(${lon})`);
      } catch (locErr) {
        console.warn("⚠️ 위치 정보를 가져오는데 실패하여 기본값을 사용합니다:", locErr);
      }

      console.log(`▶ 스트림 시작 요청 (이미지: ${actualSelfiePath}, 유저: ${userId})`);

      // 3. 실제 API 호출 (401이면 익명 세션 재발급 후 1회 재시도)
      try {
        const stream = await fetchRoutineStream(actualSelfiePath, lat, lon, token);
        await consumeRoutineStream({ stream, userId });
      } catch (firstError) {
        if (!isUnauthorizedError(firstError)) {
          throw firstError;
        }

        const refreshed = await getAuthToken();
        token = refreshed.token;
        userId = refreshed.userId;

        const retriedStream = await fetchRoutineStream(actualSelfiePath, lat, lon, token);
        await consumeRoutineStream({ stream: retriedStream, userId });
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleEvent = (event, data, userId) => {
    const draft = draftRef.current;

    switch (event) {
      case "stage":
        if (data.stage === "SKIN") {
          setStage1(true);
          setProgress(getRandomInt(29, 39));
        } else if (data.stage === "WEATHER") {
          setStage2(true);
          setProgress(getRandomInt(59, 68));
        } else if (data.stage === "PICK") {
          setStage3(true);
          setProgress(getRandomInt(90, 99));
        }
        break;
      case "context":
        if (data.weather != null) draft.weather = data.weather;
        draft.skin = data.skin ?? null;
        break;
      case "conflict":
        draft.conflicts = Array.isArray(data.pairs) ? data.pairs : [];
        break;
      case "item":
        if (data.type === "APPLY") {
          draft.routine.apply.push({ order: data.order, productId: data.productId, name: data.name, reason: data.reason });
        } else if (data.type === "SKIP") {
          draft.routine.skip.push({ productId: data.productId, name: data.name, reason: data.reason });
        }
        break;
      case "done":
        setProgress(100);
        setIsProgressing(false);
        buildFinalData();
        break;
      case "error":
        handleError(data);
        break;
      default:
        break;
    }
  };

  const handleError = (errData) => {
    setError({
      code: errData.code || "EXTERNAL_API_ERROR",
      message: errData.message || "알 수 없는 오류가 발생했습니다.",
    });
    setIsProgressing(false);
  };

  const buildFinalData = () => {
    const draft = draftRef.current;
    const formattedSelfiePath = draft.selfiePath || null;

    const finalA = {
      date: draft.date,
      selfiePath: formattedSelfiePath,
      weather: draft.weather,
      skin: draft.skin,
      routine: draft.routine,
      conflicts: draft.conflicts,
    };

    const finalB = {
      date: draft.date,
      selfieUrl: formattedSelfiePath ? `${import.meta.env.VITE_API_IMG_BASE_URL}${formattedSelfiePath}` : "none",
      weather: draft.weather,
      skin: draft.skin ? { summary: draft.skin.summary } : null,
      conflicts: draft.conflicts,
      routine: draft.routine,
    };

    setDataA(finalA);
    setDataB(finalB);
  };

  const runMockSequence = (userId, actualSelfiePath, recordDetailsMockup) => {
    setTimeout(() => {
      setStage1(true);
      setProgress(getRandomInt(29, 39));
    }, 2000);

    setTimeout(() => {
      setStage2(true);
      setProgress(getRandomInt(59, 68));
    }, 4000);

    setTimeout(() => {
      setStage3(true);
      setProgress(getRandomInt(90, 99));
    }, 6000);

    setTimeout(() => {
      setProgress(100);
      setIsProgressing(false);

      const finalMockupData = {
        ...recordDetailsMockup,
        skin: actualSelfiePath ? recordDetailsMockup.skin : null,
      };

      setDataB(finalMockupData);
      setDataA({
        ...finalMockupData,
        selfiePath: actualSelfiePath ? `${userId}/2026-08-11.jpg` : null,
      });
    }, 8000);
  };

  return {
    startStream,
    progress,
    stage1,
    stage2,
    stage3,
    error,
    isError: !!error,
    isProgressing,
    dataA,
    dataB,
  };
};
