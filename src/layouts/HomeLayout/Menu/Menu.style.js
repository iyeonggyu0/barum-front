import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const MenuStyle = css({
  width: "100%",
  height: "60px",
  backgroundColor: "#fff",
  borderRadius: "999px",
  alignItems: "center",
  ...theme.flex.rowBetween,
  cursor: "pointer",
  padding: "8px",
  boxShadow: "0 8px 24px rgba(53, 60, 55, .01)",

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
