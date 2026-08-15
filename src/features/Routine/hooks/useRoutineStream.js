// src/features/Routine/hooks/useRoutineStream.js
import { isMockMode } from "@/utils/isMockMode";
import { useRef, useState } from "react";
import { fetchRoutineStream } from "../api/routineAi";
import { recordDetailsMockup } from "@/mockup/recordDetailsMockup";
import { useAnonymousAuth } from "@/hooks/useAnonymousAuth";
import { getCurrentLocation } from "@/utils/geolocation";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
      runMockSequence("mock-user-123", actualSelfiePath);
      return;
    }

    try {
      // 1. 토큰 및 유저 ID 발급
      const { token, userId } = await getAuthToken();

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

      // 3. 실제 API 호출
      const stream = await fetchRoutineStream(actualSelfiePath, lat, lon, token);
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        let eventName = "";
        for (const line of lines) {
          if (line.startsWith("event:")) {
            eventName = line.replace("event:", "").trim();
          } else if (line.startsWith("data:")) {
            const dataStr = line.replace("data:", "").trim();
            if (dataStr) {
              try {
                handleEvent(eventName, JSON.parse(dataStr), userId);
              } catch (e) {
                console.error("JSON Parse Error:", e);
              }
            }
          }
        }
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
        if (data.weather) draft.weather = data.weather;
        if (data.skin) draft.skin = data.skin;
        break;
      case "conflict":
        if (data.pairs) draft.conflicts = data.pairs;
        break;
      case "item":
        if (data.type === "APPLY") {
          draft.routine.apply.push({ order: data.order, name: data.name, reason: data.reason });
        } else if (data.type === "SKIP") {
          draft.routine.skip.push({ name: data.name, reason: data.reason });
        }
        break;
      case "done":
        setProgress(100);
        setIsProgressing(false);
        buildFinalData(userId);
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

  const buildFinalData = (userId) => {
    const draft = draftRef.current;
    const formattedSelfiePath = draft.selfiePath ? `${userId}/${draft.selfiePath.split("/").pop()}` : null;

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

  const runMockSequence = (userId, actualSelfiePath) => {
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
