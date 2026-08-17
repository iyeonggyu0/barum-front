import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  overflow: "hidden",
  "& header": { justifyContent: "start", gap: "18px", ...theme.fonts.section, marginBottom: "16px" },
});

export const makeupSelectStyle = css({
  width: "100%",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  ...theme.flex.colStart,
});
