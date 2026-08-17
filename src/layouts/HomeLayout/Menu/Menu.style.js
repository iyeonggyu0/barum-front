import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const menuStyle = css({
  ...theme.flex.rowBetween,
  ...theme.shadow,
  width: "100%",
  height: "60px",
  backgroundColor: "#fff",
  borderRadius: "999px",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px",

  "& span": {
    width: "100%",
    height: "100%",
    borderRadius: "999px",
    ...theme.flex.center,
    ...theme.fonts.caption,
    color: theme.colors.blueInk3,
    transition: "all 0.2s",

    "&:hover": {
      color: theme.colors.greenDeep,
    },
  },
});
