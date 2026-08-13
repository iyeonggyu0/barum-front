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
    marginBottom: "24px",

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
  },

  // 상세 데이터
  "& > .data-box": {
    ...theme.flex.rowBetween,
    paddingTop: "20px",
    borderTop: `1px solid ${theme.colors.hairline}`,

    "& > div": {
      width: "100%",
    },

    "& > div > p:first-of-type": {
      ...theme.fonts.micro,
      opacity: "0.75",
    },

    "& > div > p:last-child": {
      ...theme.fonts.body,
    },
  },
});

export const weatherBoxErrorStyle = css({
  padding: "22px 24px",
  borderRadius: "30px",
  backgroundColor: theme.colors.surfaceMuted,

  ...theme.flex.rowBetween,
  alignItems: "center",

  "& .text-box > p:nth-child(1)": {
    color: theme.colors.ink3,
    marginBottom: "4px",
    ...theme.fonts.caption,
  },

  "& .text-box > p:nth-child(2)": {
    color: theme.colors.ink2,
    ...theme.fonts.body_B,
  },

  "& .button": {
    ...theme.fonts.micro,
    color: theme.colors.ink2,
    fontWeight: "600",
    padding: "10px 16px",
    backgroundColor: "#fff",
    borderRadius: "999px",
    cursor: "pointer",
  },
});
