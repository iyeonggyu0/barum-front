import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const homePageStyle = css({
  ...theme.flex.colStart,
  gap: "22px",

  // 타이틀 박스 시작
  "& .title-box.home": {
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
