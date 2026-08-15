import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";

export const routineLoadingLayoutStyle = css({
  "& header": {
    justifyContent: "center",
  },
});

export const routineLoadingStyle = css({
  width: "100%",
  flex: 1,
  ...theme.flex.colCenter,
  alignItems: "center",
  paddingBottom: "42px",
  gap: "38px",
  position: "relative",

  "& .percentage": {
    ...theme.flex.center,
    height: "230px",
    overflow: "visible",
  },

  "& .title": {
    ...theme.fonts.display,
    marginBottom: "12px",
    textAlign: "center",
  },
  "& .sub": {
    ...theme.fonts.caption,
    color: theme.colors.ink3,
    textAlign: "center",
  },

  "& .item-box": {
    width: "100%",
  },

  "& .caption": {
    position: "absolute",
    ...theme.fonts.caption,
    color: theme.colors.ink4,
    fontWeight: "300",
    bottom: "32px",
  },
});

// 개별 상태 스타일 선언
const routineItemWait = css({
  "& .order": {
    color: theme.colors.ink4,
    backgroundColor: theme.colors.surfaceMuted,
  },
  "& .name": {
    color: theme.colors.ink4,
  },
});

const routineItemIng = css({
  "& .order": {
    color: theme.colors.greenInk,
    backgroundColor: theme.colors.greenSoft,
  },
  "& .name": {
    color: theme.colors.ink1,
    fontWeight: "650", // fontWidth 오타 수정
  },
});

const routineItemEnd = css({
  "& .order": {
    color: "#fff",
    backgroundColor: theme.colors.green,
  },
  "& .name": {
    color: theme.colors.ink4,
  },
});

// 메인 함수
export const routineItem = (state) => {
  // state 값에 따라 합쳐줄 스타일을 선택
  const stateStyle = state === "wait" ? routineItemWait : state === "ing" ? routineItemIng : routineItemEnd; // "end" 또는 기본값

  // 기본 스타일과 상태 스타일을 배열로 병합하여 반환
  return [
    css({
      ...theme.flex.rowBetween,
      padding: "14px 18px",
      backgroundColor: "#fff",
      borderRadius: "22px",
      gap: "13px",
      marginBottom: "8px",

      "& .order": {
        borderRadius: "99px",
        ...theme.flex.center,
        ...theme.fonts.micro,
        fontWeight: "650",
        minWidth: "22px",
        maxWidth: "22px",
        minHeight: "22px",
        maxHeight: "22px",
      },
      "& .name": {
        flex: 1,
        ...theme.fonts.body,
      },
      "& .state": {
        color: theme.colors.ink4,
        ...theme.fonts.micro,
        fontWeight: "300",
      },
    }),
    stateStyle, // 뒤에 추가된 스타일이 기본 스타일을 덮어쓰거나 추가됨
  ];
};

// 애니메이션 공통 이징 (가속도)[cite: 1]
const ease = "cubic-bezier(.2, .6, .2, 1)";

// 1. 호흡 애니메이션 (코어 원형)[cite: 1]
const brmBreathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// 2. 파동 애니메이션 (배경 퍼짐 효과)[cite: 1]
const brmBloom = keyframes`
  0% { transform: scale(.55); opacity: 0; }
  18% { opacity: .5; }
  100% { transform: scale(1.6); opacity: 0; }
`;

// 3. 궤도 회전 애니메이션[cite: 1]
const brmOrbit = keyframes`
  to { transform: rotate(360deg); }
`;

const textPulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.08); /* 8% 정도 커짐, 원하는 만큼 숫자 조절 가능 */
  }
`;

/* =======================================================
   로딩 컴포넌트 스타일
   ======================================================= */

export const loaderWrapperStyle = css({
  position: "relative",
  width: "230px",
  height: "230px",
  ...theme.flex.center,
});

export const loaderWaveStyle = css({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  background: theme.colors.greenSoft,
  animation: `${brmBloom} 3.6s ${ease} infinite`,

  "&:nth-of-type(2)": {
    animationDelay: "1.2s",
  },
  "&:nth-of-type(3)": {
    animationDelay: "2.4s",
  },
});

export const loaderOrbitStyle = css({
  position: "absolute",
  width: "176px",
  height: "176px",
  borderRadius: "50%",
  animation: `${brmOrbit} 7s linear infinite`,

  "& > i": {
    position: "absolute",
    top: "-4px",
    left: "50%",
    marginLeft: "-4px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: theme.colors.greenDot,
  },
});

export const loaderOrbitSlowStyle = css([
  loaderOrbitStyle,
  {
    animation: `${brmOrbit} 11s linear infinite reverse`,

    "& > i": {
      top: "auto",
      bottom: "-3px",
      marginLeft: "-3px",
      width: "6px",
      height: "6px",
      background: theme.colors.blueInk3,
      opacity: 0.55,
    },
  },
]);

export const loaderCoreStyle = css({
  position: "relative",
  width: "132px",
  height: "132px",
  borderRadius: "50%",
  background: theme.colors.green,
  color: theme.colors.onGreen,
  boxShadow: theme.shadow.boxShadow,
  ...theme.flex.center,
  animation: `${brmBreathe} 3.2s ${ease} infinite`,
});

export const loaderPctStyle = css({
  textAlign: "center",
  fontSize: "34px",
  fontWeight: "700",
  lineHeight: "1.15",
  letterSpacing: "-1.5px",
  zIndex: 999,

  // transform이 정상적으로 먹히도록 설정 (flex 컨테이너 안이라면 생략 가능)
  display: "inline-block",

  // 1.5초 동안 부드럽게(ease-in-out) 무한 반복(infinite)
  animation: `${textPulse} 4s ease-in-out infinite`,
});
