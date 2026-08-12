import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const background = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: theme.colors.bgApp,
});

export const mobileContainer = (isMobile) =>
  css({
    width: "100%",
    maxWidth: isMobile ? "1199px" : "412px",
    height: isMobile ? "100vh" : "865px",
    maxHeight: "100vh",
    backgroundColor: theme.colors.bg,
    boxShadow: isMobile ? "0 24px 60px rgba(53, 60, 55, .01)" : "",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    borderRadius: isMobile ? "" : "44px",

    /* 스크롤바 숨김 처리 */
    "&::-webkit-scrollbar": {
      display: "none",
    },
  });
