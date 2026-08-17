import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const routineSelfieLayoutStyle = css({ ...theme.flex.colBetween });

// 메인 스타일
export const routineSelfieStyle = css({
  ...theme.flex.colStart,
  width: "100%",
  height: " 100%",
  gap: "18px",

  "& .title": {
    ...theme.fonts.titleL,
  },

  "& .caption": {
    color: theme.colors.ink3,
    textAlign: "center",
    ...theme.fonts.caption,
  },

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

  "& .select-button": {
    marginBottom: "8px",
  },
});
