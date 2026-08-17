import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const weatherBoxStyle = css({
  width: "100%",
  backgroundColor: theme.colors.green,
  borderRadius: "30px",
  padding: "22px 24px",
  color: "#fff",

  "& > .title-box": {
    ...theme.flex.rowBetween,

    "& > .title": {
      maxWidth: "50%",
      wordBreak: "keep-all",
      overflowWrap: "break-word",
    },

    "& .loc": {
      ...theme.fonts.micro,
      opacity: "0.75",
      marginBottom: "8px",
    },

    "& .text": {
      ...theme.fonts.lead,
    },

    // 온도
    "& .temp": {
      ...theme.fonts.metric,
    },

    // 습도
    "& .humidity": {
      ...theme.fonts.nano,
      opacity: "0.7",
      textAlign: "end",
    },
  },
});
