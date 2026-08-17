import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  overflow: "hidden",
  "& header": { justifyContent: "start", gap: "18px", ...theme.fonts.section, marginBottom: "16px" },
});

export const makeupCameraResultStyle = css({
  width: "100%",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  ...theme.flex.colStart,
  gap: "12px",

  "& .top-box": {
    width: "100%",
    padding: "20px 22px",
    borderRadius: "30px",
    backgroundColor: theme.colors.green,
    color: "white",
    ...theme.flex.rowBetween,
    alignItems: "center",
    gap: "20px",
    flexShrink: 0, // 추가: 윗부분이 찌그러지지 않도록 방지

    "& .img-box": {
      width: "58px",
      height: "58px",
      borderRadius: "18px",
      background: `repeating-linear-gradient(
      -45deg,
      ${theme.colors.green},
      ${theme.colors.green} 8px,
      ${theme.colors.veil} 8px,
      ${theme.colors.veil} 16px
    )`,
    },

    "& .text-box": {
      flex: 1,
      width: "100%",

      "& .sub": {
        ...theme.fonts.micro,
        opacity: 0.7,
        fontWeight: "300",
      },

      "& .title": {
        fontWeight: "650",
      },
    },
  },

  "& .list": {
    width: "100%",
    flex: 1, // 추가: section의 남은 높이를 모두 차지
    minHeight: 0, // 추가: flex 자식 스크롤 버그 방지
    display: "flex", // 추가: 내부 요소(.text-box, .box) 세로 배치용
    flexDirection: "column",
    gap: "8px", // .text-box와 .box 사이의 간격 (필요에 따라 조절)

    "& .text-box": {
      width: "100%",
      ...theme.flex.rowBetween,
      flexShrink: 0, // 추가: 텍스트 영역이 찌그러지지 않도록 방지

      "& .title": {
        fontWeight: "650",
        color: theme.colors.ink1,
      },
      "& .num": {
        color: theme.colors.ink4,
        ...theme.fonts.caption,
      },
    },
    "& .caption": {
      color: theme.colors.ink4,
      ...theme.fonts.micro,
      marginTop: "8px",
    },

    "& .box": {
      flex: 1, // 추가: .list의 남은 높이를 모두 차지
      minHeight: 0, // 추가: 컨텐츠가 길어져도 부모 높이를 뚫고 나가지 않고 스크롤되도록 필수
      overflowY: "auto",

      // 파이어폭스 스크롤바 숨김
      scrollbarWidth: "none",

      // IE, Edge 스크롤바 숨김
      msOverflowStyle: "none",

      // 크롬, 사파리, 오페라 스크롤바 숨김
      "&::-webkit-scrollbar": {
        display: "none",
      },

      borderRadius: "20px",
      backgroundColor: "#fff",
      padding: "6px 18px",

      "& > div": {
        ...theme.flex.rowStart,
        padding: "12px 4px",
        gap: "8px",

        "&:not(:last-of-type)": {
          borderBottom: `1px solid ${theme.colors.surfaceMuted}`,
        },
        "& .name": {
          ...theme.fonts.body,
          color: theme.colors.ink1,
          "&.not-matched": {
            color: theme.colors.ink4,
          },
        },
        "& .idx": {
          minWidth: "26px",
          ...theme.flex.center,
          ...theme.fonts.nano,
          color: theme.colors.ink4,
          fontWeight: "300",
        },
      },
    },
  },
});
