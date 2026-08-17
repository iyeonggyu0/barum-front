import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const homeRecordListStyle = css({
  width: "100%",
  overflow: "",

  " & > .title-box": {
    ...theme.flex.rowBetween,
    marginBottom: "20px",

    "& > .title": {
      ...theme.fonts.section,
    },
    "& > .button": {
      ...theme.fonts.micro,
      color: theme.colors.ink3,
      cursor: "pointer",
    },
  },
});
