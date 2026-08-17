import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const barButtonStyle = (colorTheme) =>
  css({
    ...theme.flex.center,
    width: "100%",
    height: "56px",
    borderRadius: "999px",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.2s",

    // 그린 테마
    ...(colorTheme === "green" && {
      ...theme.fonts.cta,
      backgroundColor: theme.colors.greenDeep,
      color: "#fff",

      "&:hover": { backgroundColor: theme.colors.greenDeepHover },
    }),

    ...(colorTheme === "white" && {
      ...theme.fonts.cta,
      backgroundColor: "#fff",
      color: theme.colors.ink2,

      "&:hover": { backgroundColor: theme.colors.surfaceMuted },
    }),

    ...(colorTheme === "none" && {
      ...theme.fonts.cta,
      backgroundColor: theme.colors.surfaceMuted,
      color: theme.colors.ink4,
      cursor: "not-allowed",
    }),

    ...(colorTheme === "red" && {
      ...theme.fonts.cta,
      backgroundColor: theme.colors.warn,
      color: "#fff",

      "&:hover": { backgroundColor: theme.colors.warnInk },
    }),
  });
