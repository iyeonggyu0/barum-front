import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const exVanityStyle = css({
  ...theme.flex.center,
  ...theme.fonts.micro,
  width: "fit-content",
  gap: "8px",
  padding: "7px 12px",
  backgroundColor: theme.colors.greenBadge,
  color: `${theme.colors.greenInk} !important`,
  borderRadius: "999px",

  "&>div": {
    borderRadius: "999px",
    minWidth: "6px",
    minHeight: "6px",
    backgroundColor: theme.colors.greenDot,
  },
});
