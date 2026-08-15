import { ExVanity } from "@/components";
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
      <header>
        <ExVanity />
      </header>
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
              : smoothProgress >= 89
                ? "거의 다 됐어요"
                : smoothProgress >= 55
                  ? "화장대를 둘러보고 있어요"
                  : smoothProgress >= 25
                    ? "날씨를 반영 중이에요"
                    : "피부를 진단하고 있어요"}
          </p>
        </div>
        <div className="item-box">
          {/* 1단계: 피부 상태 확인 중 */}
          <div className="item" css={routineItem(smoothProgress < 25 ? "ing" : "end")}>
            <span className="order">{smoothProgress < 25 ? "1" : <FontAwesomeIcon icon={faCheck} />}</span>
            <p className="name">피부 상태 확인 중</p>
            <p className="state">{smoothProgress < 25 ? "진행 중" : "확인 완료"}</p>
          </div>

          {/* 2단계: 오늘 날씨 반영 중 */}
          <div className="item" css={routineItem(smoothProgress < 25 ? "wait" : smoothProgress < 55 ? "ing" : "end")}>
            <span className="order">{smoothProgress < 55 ? "2" : <FontAwesomeIcon icon={faCheck} />}</span>
            <p className="name">오늘 날씨 반영 중</p>
            <p className="state">{smoothProgress < 25 ? "대기 중" : smoothProgress < 55 ? "진행 중" : "반영 완료"}</p>
          </div>

          {/* 3단계: 화장대에서 고르는 중 */}
          <div className="item" css={routineItem(smoothProgress < 55 ? "wait" : smoothProgress < 100 ? "ing" : "end")}>
            <span className="order">{smoothProgress < 100 ? "3" : <FontAwesomeIcon icon={faCheck} />}</span>
            <p className="name">화장대에서 고르는 중</p>
            <p className="state">{smoothProgress < 55 ? "대기 중" : smoothProgress < 100 ? "진행 중" : "선택 완료"}</p>
          </div>
        </div>
        <p className="caption">사진은 분석 후 나만 볼 수 있게 보관돼요</p>
      </section>
    </BasicLayout>
  );
};

export default RoutineLoading;
