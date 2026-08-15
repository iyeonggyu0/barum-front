import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  "& header .left-box": {
    ...theme.flex.rowStart,
    alignItems: "center",
    gap: "20px",
  },

  "& header .left-box p": {
    color: theme.colors.ink1,
    ...theme.fonts.section,
  },

  "& header .delete": {
    color: theme.colors.warn,
    padding: "0 8px",
    cursor: "pointer",
  },
});
export const recordResultStyle = css({
  ...theme.flex.colStart,
  alignItems: "start",
  gap: "20px",
});
