import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const makeupPageStyle = css({
  ...theme.flex.colStart,
  gap: "22px",
  flex: 1,
  // height: "calc(100% - 36px - 8px)",

  // 타이틀 박스 시작

  "& .makeup": {
    ...theme.flex.rowBetween,
    alignItems: "center",

    "& .plus": {
      borderRadius: "999px",
      padding: "8px 18px",
      backgroundColor: theme.colors.greenDeep,
      color: "#fff",
      ...theme.fonts.caption_tab,
      cursor: "pointer",
    },
  },

  "& .makeup > .title-box": {
    ...theme.flex.colStart,
    gap: "8px",

    // 날짜
    "& .date": {
      ...theme.fonts.caption,
      color: theme.colors.ink3,
    },

    // 타이틀
    "& .title": {
      ...theme.fonts.display,
    },
  },
});
