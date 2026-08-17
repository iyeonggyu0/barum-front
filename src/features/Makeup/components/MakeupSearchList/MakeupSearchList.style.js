import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const makeupSearchList = css({
  width: "100%",
  height: "100%",
  flex: 1,

  position: "relative",
  overflowY: "auto",
  // 파이어폭스 스크롤바 숨김
  scrollbarWidth: "none",

  // IE, Edge 스크롤바 숨김
  msOverflowStyle: "none",

  // 크롬, 사파리, 오페라 스크롤바 숨김
  "&::-webkit-scrollbar": {
    display: "none",
  },

  "& .page-box": {
    width: "100%",
    ...theme.flex.center,
    ...theme.fonts.caption,
    color: theme.colors.ink2,
    gap: "12px",
    margin: "12px 0",

    "& .button": {
      width: "26px",
      height: "26px",
      borderRadius: "6px",
      ...theme.flex.center,
      backgroundColor: theme.colors.surfaceMuted,
      cursor: "pointer",
    },

    "& .button.is-none": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const makeupSearchListItem = (checked = false) =>
  css({
    ...theme.flex.rowBetween,
    backgroundColor: "#fff",
    padding: "14px",
    borderRadius: "26px",
    gap: "14px",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "8px",
    boxSizing: "content-box",
    border: `2px solid ${checked ? theme.colors.green : theme.colors.bg}`,

    "& .checked": {
      minWidth: "28px",
      minHeight: "28px",
      border: `1px solid ${checked ? theme.colors.green : theme.colors.lineStrong}`,
      backgroundColor: checked ? theme.colors.green : "unset",
      borderRadius: "99px",
      ...theme.flex.center,

      "& .icon": {
        ...theme.fonts.caption,
        color: "white",
        display: checked ? "block" : "none",
      },
    },

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

      "& .type": {
        ...theme.fonts.micro,
        color: theme.colors.ink2,
      },
      "& .name": {
        ...theme.fonts.body_B,
        color: theme.colors.ink1,
      },
    },

    "& .ingredient": {
      ...theme.fonts.nano,
      padding: "3px 8px",
      backgroundColor: theme.colors.greenSoft,
      color: theme.colors.greenInk,
      marginRight: "8px",
      borderRadius: "999px",
    },

    "&.skeleton": {
      pointerEvents: "none",

      "& .skeleton-thumb": {
        width: "60px",
        height: "60px",
        borderRadius: "18px",
        flexShrink: 0,
        backgroundColor: theme.colors.surfaceMuted,
      },

      "& .text-box": {
        ...theme.flex.colStart,
        gap: "6px",
      },

      "& .skeleton-line": {
        height: "12px",
        borderRadius: "999px",
        width: "100%",
        backgroundColor: theme.colors.surfaceMuted,
      },

      "& .skeleton-line.short": {
        width: "38%",
      },

      "& .skeleton-icon": {
        width: "12px",
        height: "12px",
        borderRadius: "999px",
        backgroundColor: theme.colors.surfaceMuted,
        flexShrink: 0,
        marginRight: "2px",
      },

      "& .skeleton-thumb, & .skeleton-line, & .skeleton-icon": {
        backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.65) 50%, rgba(255, 255, 255, 0) 100%)",
        backgroundSize: "200% 100%",
        animation: "recordSkeletonShimmer 1.3s ease-in-out infinite",
      },
    },

    "@keyframes recordSkeletonShimmer": {
      "0%": {
        backgroundPosition: "200% 0",
      },
      "100%": {
        backgroundPosition: "-200% 0",
      },
    },
  });
