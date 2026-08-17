import { useRoutineStream } from "@/features/Routine/hooks/useRoutineStream";
import { BasicLayout } from "@/layouts";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  // loaderCapStyle,
  loaderCoreStyle,
  loaderOrbitSlowStyle,
  loaderOrbitStyle,
  loaderPctStyle,
  loaderWaveStyle,
  loaderWrapperStyle,
  routineItem,
  routineLoadingLayoutStyle,
  routineLoadingStyle,
} from "./RoutineLoading.style";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoutineLoading = () => {
  const [searchParams] = useSearchParams();
  const imgPath = searchParams.get("img_path") ?? searchParams.get("img");
  const navigate = useNavigate();

  const {
    // [함수] AI 스트림(또는 목업) 데이터를 요청하고 수신을 시작하는 트리거 함수
    startStream,
    // [상태] 전체 진행률 퍼센티지 (0 ~ 100)
    progress,
    // [상태] 1단계: "피부 상태 확인 중" 완료 여부 (true 면 완료)
    stage1,
    // [상태] 2단계: "오늘 날씨 반영 중" 완료 여부 (true 면 완료)
    stage2,
    // [상태] 3단계: "화장대에서 고르는 중" 완료 여부 (true 면 완료)
    stage3,
    // [상태] 에러 발생 시 에러 상세 정보를 담은 객체 (에러가 없으면 null)
    // 예: { code: 'AI_TIMEOUT', message: '응답 초과...' }
    error,
    // [상태] 에러 발생 여부를 직관적으로 확인하기 위한 불리언 값 (!! error)
    isError,
    // [상태] 현재 스트림 데이터를 받아오며 로딩이 진행 중인지
    // (진행 중: true, 완료 또는 에러로 중단됨: false)
    isProgressing,
    // [데이터] 스트림 수신 완료 후 파싱 된 A 타입 형태의 최종 결과 데이터
    dataA: savedData,
    // [데이터] 스트림 수신 완료 후 파싱 된 B 타입 형태의 최종 결과 데이터
    dataB: resultData,
  } = useRoutineStream();

  const [smoothProgress, setSmoothProgress] = useState(0);
  const displayedProgressRef = useRef(0);
  const isStreamStartedRef = useRef(false);

  useEffect(() => {
    // 1. 에러가 없거나 isError가 false인 경우 무시
    if (!isError || !error) return;

    // 2. HTTP 오류 또는 스트림 내 error 이벤트로 들어온 code 추출
    // (서버 응답 구조에 따라 error.code 또는 error.response?.data?.code 형태일 수 있습니다)
    const errorCode = error.code;

    switch (errorCode) {
      case "EMPTY_VANITY":
        // 보유 제품 0개
        console.warn("화장대를 채워주세요:", error.message);
        navigate("/routine/create/error?type=EMPTY_VANITY");
        break;

      case "AI_TIMEOUT":
        // 25초 내 루틴 생성 실패
        console.error("AI 응답 초과:", error.message);
        navigate("/routine/create/error");
        break;

      case "EXTERNAL_API_ERROR":
        // 그 외 AI 서버 오류
        console.error("외부 API 오류:", error.message);
        navigate("/routine/create/error?type=EXTERNAL_API_ERROR");
        break;

      case "UNAUTHORIZED": // HTTP 401
        // 인증 토큰 없음 / 형식 오류
        console.warn("인증 만료 또는 유효하지 않음");
        break;

      case "VALIDATION_ERROR": // HTTP 400
        console.error("요청 데이터 형식 오류:", error.message);
        break;

      default:
        // 정의되지 않은 그 외 에러 처리
        console.error("알 수 없는 에러 발생:", error);
        break;
    }
  }, [error, isError]);

  const stage1State = stage1 ? "end" : "ing";
  const stage2State = !stage1 ? "wait" : stage2 ? "end" : "ing";
  const stage3State = !stage2 ? "wait" : progress >= 100 || stage3 ? (progress >= 100 ? "end" : "ing") : "wait";

  useEffect(() => {
    let animationFrameId;
    const startValue = displayedProgressRef.current;
    const endValue = progress;

    const duration = 1200;
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const timeFraction = Math.min(elapsedTime / duration, 1);
      const progressFraction = easeInOutCubic(timeFraction);
      const currentValue = Math.round(startValue + (endValue - startValue) * progressFraction);
      setSmoothProgress(currentValue);
      displayedProgressRef.current = currentValue;
      if (timeFraction < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    if (startValue !== endValue) {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  // 1. 초기 호출
  useEffect(() => {
    if (isStreamStartedRef.current) {
      return;
    }
    isStreamStartedRef.current = true;

    console.log(`▶ 스트림 시작 요청 (이미지: ${imgPath})`);
    startStream(imgPath);
  }, [imgPath, startStream]); // StrictMode에서도 ref 가드로 중복 호출 방지

  // 2. 진행 상태 로킹
  useEffect(() => {
    if (isProgressing) {
      console.log(`⏳ 진행률: ${progress}% | 1단계(피부): ${stage1} | 2단계(날씨): ${stage2} | 3단계(아이템): ${stage3}`);
    }
  }, [progress, stage1, stage2, stage3, isProgressing]);

  // 3. 에러 로킹
  useEffect(() => {
    if (isError) {
      console.error(`❌ 에러 발생 [${error.code}]:`, error.message);
    }
  }, [isError, error]);

  // 4. 완료 시 데이터 로킹
  useEffect(() => {
    if (!isProgressing && savedData && resultData) {
      console.log("✅ 완료! 최종 데이터:");
      console.log("Data A Type:", savedData);
      console.log("Data B Type:", resultData);
    }
  }, [isProgressing, savedData, resultData]);

  useEffect(() => {
    // 퍼센티지가 100에 도달했을 때 실행
    if (progress === 100) {
      const timer = setTimeout(() => {
        // 2초 뒤 결과 페이지로 이동하며 dataA, dataB 모두 전달
        navigate("/routine/result", { state: { savedData, resultData } });
      }, 2000);

      // 클린업 함수
      return () => clearTimeout(timer);
    }
  }, [progress, navigate, savedData, resultData]);

  // UI 렌더링을 최소화하여 콘솔 확인 목적 달성
  return (
    <BasicLayout styleObj={routineLoadingLayoutStyle}>
      <section css={routineLoadingStyle}>
        <div className="percentage">
          <div css={loaderWrapperStyle}>
            {/* 백그라운드 파동 (Wave) */}
            <i css={loaderWaveStyle} />
            <i css={loaderWaveStyle} />
            <i css={loaderWaveStyle} />

            {/* 정방향 빠른 궤도 */}
            <div css={loaderOrbitStyle}>
              <i />
            </div>

            {/* 역방향 느린 궤도 */}
            <div css={loaderOrbitSlowStyle}>
              <i />
            </div>

            {/* 중앙 메인 코어 */}
            <div css={loaderCoreStyle}>
              <div css={loaderPctStyle}>{smoothProgress}%</div>
            </div>
          </div>
        </div>
        <div>
          <p className="title">루틴을 생성 중이에요</p>
          <p className="sub">
            {smoothProgress === 100
              ? "결과 화면 구성 중"
              : stage3
                ? "거의 다 됐어요"
                : stage2
                  ? "화장대를 둘러보고 있어요"
                  : stage1
                    ? "날씨를 반영 중이에요"
                    : "피부를 진단하고 있어요"}
          </p>
        </div>
        <div className="item-box">
          {/* 1단계: 피부 상태 확인 중 */}
          <div className="item" css={routineItem(stage1State)}>
            <span className="order">{stage1State === "end" ? <FontAwesomeIcon icon={faCheck} /> : "1"}</span>
            <p className="name">피부 상태 확인 중</p>
            <p className="state">{stage1State === "end" ? "확인 완료" : "진행 중"}</p>
          </div>

          {/* 2단계: 오늘 날씨 반영 중 */}
          <div className="item" css={routineItem(stage2State)}>
            <span className="order">{stage2State === "end" ? <FontAwesomeIcon icon={faCheck} /> : "2"}</span>
            <p className="name">오늘 날씨 반영 중</p>
            <p className="state">{stage2State === "wait" ? "대기 중" : stage2State === "ing" ? "진행 중" : "반영 완료"}</p>
          </div>

          {/* 3단계: 화장대에서 고르는 중 */}
          <div className="item" css={routineItem(stage3State)}>
            <span className="order">{stage3State === "end" ? <FontAwesomeIcon icon={faCheck} /> : "3"}</span>
            <p className="name">화장대에서 고르는 중</p>
            <p className="state">{stage3State === "wait" ? "대기 중" : stage3State === "ing" ? "진행 중" : "선택 완료"}</p>
          </div>
        </div>
        <p className="caption">사진은 분석 후 나만 볼 수 있게 보관돼요</p>
      </section>
    </BasicLayout>
  );
};

export default RoutineLoading;
