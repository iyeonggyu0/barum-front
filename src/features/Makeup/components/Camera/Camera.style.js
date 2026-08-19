import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const containerStyle = css({
  ...theme.flex.center,
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: theme.colors.cam,
  borderRadius: "24px",
  overflow: "hidden",
});

export const videoStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const badgeStyle = css({
  position: "absolute",
  top: "16px",
  left: "16px",
  backgroundColor: theme.colors.scrim,
  padding: "6px 10px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  zIndex: 10,

  "& span": {
    ...theme.fonts.micro,
    color: theme.colors.surface,
  },
});

export const dotStyle = css({
  width: "6px",
  height: "6px",
  backgroundColor: theme.colors.greenDot,
  borderRadius: "50%",
});

export const guideStyle = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60%",

  border: `1.5px solid ${theme.colors.veil}`,
  borderRadius: "36px",
  zIndex: 10,
  pointerEvents: "none",
});

export const textStyle = css({
  position: "absolute",
  bottom: "24px",
  width: "100%",
  textAlign: "center",
  ...theme.fonts.caption,
  color: "#e5e5e5",
  zIndex: 10,
  textShadow: "0px 1px 3px rgba(0,0,0,0.6)",
});

export const errorWrapperStyle = css({
  ...theme.flex.colCenter,
  alignItems: "center",
  width: "100%",
  height: "100%",
  minHeight: "420px",
  backgroundColor: theme.colors.surfaceMuted,
  borderRadius: "24px",
  padding: "20px",
  textAlign: "center",
});

export const errorIconBoxStyle = css({
  ...theme.flex.center,
  width: "80px",
  height: "80px",
  backgroundColor: theme.colors.surface,
  borderRadius: "50%",
  marginBottom: "24px",
  color: theme.colors.ink4,
  fontSize: "32px",
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
  wordBreak: "keep-all",
});
