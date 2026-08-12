import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const MenuButtonStyle = css({
  ...theme.fonts.micro,
  ...theme.flex.center,
  backgroundColor: theme.colors.surfaceMuted,
  cursor: "pointer",
  minWidth: "36px",
  maxWidth: "36px",
  minHeight: "36px",
  maxHeight: "36px",
  borderRadius: "20px",
});
