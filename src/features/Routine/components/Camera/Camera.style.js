import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const containerStyle = css({
  ...theme.flex.center, // display: flex, justifyContent: center, alignItems: center
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: "450px", // 레이아웃에 맞춰 조절하세요
  backgroundColor: theme.colors.cam, // 카메라 뷰 전용 어두운 배경색
  borderRadius: "24px",
  overflow: "hidden",
});

export const videoStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "scaleX(-1)", // 셀카(거울) 모드를 위한 좌우 반전
});

export const badgeStyle = css({
  position: "absolute",
  top: "16px",
  left: "16px",
  backgroundColor: theme.colors.scrim, // 오버레이용 반투명 배경
  padding: "6px 10px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  zIndex: 10,

  "& span": {
    ...theme.fonts.micro, // 12.5px 폰트
    color: theme.colors.surface, // 흰색 텍스트
  },
});

export const dotStyle = css({
  width: "6px",
  height: "6px",
  backgroundColor: theme.colors.greenDot, // 메인 테마의 카메라 활성화 표시 그린 컬러
  borderRadius: "50%",
});

export const guideStyle = css({
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  aspectRatio: "3 / 4",
  border: `1.5px solid ${theme.colors.veil}`, // 테마에 정의된 반투명 라인
  borderRadius: "50%",
  zIndex: 10,
  pointerEvents: "none",
});

export const textStyle = css({
  position: "absolute",
  bottom: "24px",
  width: "100%",
  textAlign: "center",
  ...theme.fonts.caption, // 14.5px, 굵은 텍스트 적용
  color: "#e5e5e5",
  zIndex: 10,
  textShadow: "0px 1px 3px rgba(0,0,0,0.6)", // 영상 위에서 가독성을 높이기 위한 그림자는 유지
});

export const errorStyle = css({
  ...theme.fonts.body,
  color: theme.colors.warn, // 경고 코랄 컬러 적용
  textAlign: "center",
  padding: "20px",
});
export const errorWrapperStyle = css({
  ...theme.flex.colCenter,
  alignItems: "center",
  width: "100%",
  height: "100%",
  minHeight: "450px", // 기존 카메라 레이아웃과 동일한 높이 유지
  backgroundColor: theme.colors.surfaceMuted, // 두 번째 이미지처럼 밝은 톤의 그레이 배경
  borderRadius: "24px",
  padding: "20px",
  textAlign: "center",
});

export const errorIconBoxStyle = css({
  ...theme.flex.center,
  width: "80px",
  height: "80px",
  backgroundColor: theme.colors.surface, // 흰색 원형 배경
  borderRadius: "50%",
  marginBottom: "24px",
  color: theme.colors.ink4, // 연한 그레이 아이콘 색상
  fontSize: "32px", // 아이콘 크기 조절
});

export const errorTitleStyle = css({
  ...theme.fonts.titleS,
  color: theme.colors.ink1,
  marginBottom: "12px",
});

export const errorDescStyle = css({
  ...theme.fonts.sub,
  color: theme.colors.ink2,
  lineHeight: "1.6",
  wordBreak: "keep-all", // 텍스트 줄바꿈이 자연스럽게 되도록 설정
});
