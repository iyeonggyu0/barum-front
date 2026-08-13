import { css } from "@emotion/react";

export const globalStyles = css({
  "*, *::before, *::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  html: {
    height: "100%",
    WebkitTextSizeAdjust: "100%",
    textSizeAdjust: "100%",
  },

  body: {
    margin: 0,
    padding: "0",
    minHeight: "100%",
    fontWeight: 400,
    color: "#333333",
    lineHeight: 1.5,
  },

  a: {
    textDecoration: "none",
    color: "inherit",
  },

  "button, input, select, textarea": {
    // border: "none",
    // background: "none",
    cursor: "pointer",
  },

  "ul, ol": {
    listStyle: "none",
  },

  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },

  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
});
