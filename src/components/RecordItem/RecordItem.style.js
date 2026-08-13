import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const recordItemStyle = css({
  ...theme.flex.rowBetween,
  backgroundColor: "#fff",
  padding: "14px",
  borderRadius: "26px",
  gap: "14px",
  alignItems: "center",
  cursor: "pointer",

  "& > img": {
    width: "60px", // 또는 44px (기존 CSS 참고)
    height: "60px",
    borderRadius: "18px",
    objectFit: "cover",
    flexShrink: 0, // flex 컨테이너 안에서 썸네일이 찌그러지지 않도록 방지
  },

  // 이미지가 없을 때 렌더링되는 noneImg 스타일 (빗금 패턴)
  "& .noneImg": {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    flexShrink: 0,
    // 사선 스트라이프 패턴 구현
    background: `repeating-linear-gradient(
      -45deg,
      ${theme.colors.bg},
      ${theme.colors.bg} 8px,
      ${theme.colors.surfaceMuted} 8px,
      ${theme.colors.surfaceMuted} 16px
    )`,
  },

  "& .text-box": {
    width: "100%",

    "& .date": {
      ...theme.fonts.body_B,
      color: theme.colors.ink1,
    },
    "& .data": {
      ...theme.fonts.micro,
      color: theme.colors.ink2,
    },
  },

  "& .icon": {
    color: theme.colors.ink4,
    ...theme.fonts.caption,
  },

  "& .hasConflict": {
    ...theme.fonts.nano,
    padding: "3px 8px",
    backgroundColor: theme.colors.warnBg,
    color: theme.colors.warnInk,
    marginLeft: "8px",
    borderRadius: "999px",
  },
});
