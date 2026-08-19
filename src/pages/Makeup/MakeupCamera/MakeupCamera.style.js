import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  overflow: "hidden",
  "& header": {
    justifyContent: "start",
    gap: "18px",
    ...theme.fonts.section,
    marginBottom: "16px",
  },
});

// 동적 상태(isUploading)를 받아 하위 선택자에 적용
export const makeupCameraStyle = css({
  width: "100%",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  ...theme.flex.colStart,
  gap: "12px",

  "& > .camera": {
    height: "430px",
    borderRadius: "30px",
  },

  "& .caption": {
    padding: "14px 18px",
    backgroundColor: "white",
    borderRadius: "20px",
    "& .title": {
      ...theme.fonts.body_B,
      color: theme.colors.ink2,
      marginBottom: "4px",
    },
    "& .sub": {
      color: theme.colors.ink2,
      ...theme.fonts.micro,
    },
  },

  "& .alias > p": {
    ...theme.fonts.caption,
    color: theme.colors.ink2,
  },

  "& .alias > input": {
    outline: "none",
    border: "none",
    width: "100%",
    padding: "16px 18px",
    borderRadius: "999px",
  },
});

export const shootButton = css({
  "& .button-box": {
    ...theme.flex.rowBetween,
    alignItems: "center",
    gap: "24px",

    "& > .button": {
      maxWidth: "60px",
      minWidth: "60px",
      maxHeight: "60px",
      minHeight: "60px",
      borderRadius: "999px",
      padding: "3px",
      border: `4px solid ${theme.colors.greenDeep}`,
      position: "relative",
      cursor: "pointer",
      ...theme.flex.center,

      "& > div": {
        width: "46px",
        height: "46px",
        borderRadius: "999px",
        backgroundColor: theme.colors.greenDeep,
      },
    },

    "& .text": {
      width: "100%",
      color: theme.colors.ink2,
      ...theme.fonts.body,
    },
  },
});

export const ocrLoadingStyle = css({
  width: "100%",
  flex: 1,
  ...theme.flex.colCenter,
  alignItems: "center",
  justifyContent: "center",
  gap: "28px",

  "& .title": {
    ...theme.fonts.display,
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
});
