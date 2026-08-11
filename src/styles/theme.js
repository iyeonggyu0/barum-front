// import { css } from "@emotion/react";
// import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const fonts = {
  // Display & Metrics
  display: { fontSize: "30px", fontWeight: "700", lineHeight: "1.15", letterSpacing: "-1px" },
  metric: { fontSize: "34px", fontWeight: "700", lineHeight: "1.15", letterSpacing: "-1.5px" },

  // Titles
  titleL: { fontSize: "26px", fontWeight: "700", lineHeight: "1.35", letterSpacing: "-0.5px" },
  titleM: { fontSize: "22px", fontWeight: "700", lineHeight: "1.35", letterSpacing: "-0.5px" },
  titleS: { fontSize: "20px", fontWeight: "700", lineHeight: "1.35", letterSpacing: "-0.5px" },
  cardTitle: { fontSize: "19px", fontWeight: "700", lineHeight: "1.35", letterSpacing: "-0.5px" },
  section: { fontSize: "17px", fontWeight: "700", lineHeight: "1.35", letterSpacing: "-0.5px" },

  // Leads & Buttons
  lead: { fontSize: "16px", fontWeight: "600", lineHeight: "1.45", letterSpacing: "-0.4px" },
  cta: { fontSize: "15.5px", fontWeight: "650", lineHeight: "1.6", letterSpacing: "-0.3px" },

  // Body Texts
  body: { fontSize: "14.5px", fontWeight: "500", lineHeight: "1.6", letterSpacing: "-0.4px" },
  body_B: { fontSize: "14.5px", fontWeight: "650", lineHeight: "1.6", letterSpacing: "-0.4px" },
  sub: { fontSize: "13.5px", fontWeight: "500", lineHeight: "1.6", letterSpacing: "-0.3px" },

  // Captions & Micro texts
  caption: { fontSize: "13px", fontWeight: "500", lineHeight: "1.6", letterSpacing: "-0.2px" },
  caption_tab: { fontSize: "13px", fontWeight: "550", lineHeight: "1.6", letterSpacing: "-0.2px" }, // tabbar 전용
  micro: { fontSize: "12.5px", fontWeight: "500", lineHeight: "1.6", letterSpacing: "-0.2px" },
  nano: { fontSize: "11.5px", fontWeight: "500", lineHeight: "1.6", letterSpacing: "-0.2px" },
};

export const flex = {
  rowEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  rowStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  colStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  colEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // 중앙 정렬
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    display: "flex",
    justifyContent: "center",
  },
  colCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  // 비트윈
  between: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  colBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  // 어라운드
  around: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowAround: {
    display: "flex",
    justifyContent: "space-around",
  },
  colAround: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
};

export const colors = {
  // 배경 / 표면
  bgApp: "#E9E7E1",
  bg: "#F5F3EE",
  surface: "#FFFFFF",
  surfaceMuted: "#EBE9E3",
  line: "#F1EFE9",
  lineStrong: "#DDDBD3",

  // 메인 그린 (세이지)
  green: "#7F9483",
  greenInk: "#5F7466",
  greenSoft: "#EDF0EA",
  greenBadge: "#E4E8E1",
  greenDot: "#8AA08C",
  greenDeep: "#3C4A40",
  greenDeepHover: "#2F3A32",

  // 뮤트 블루 (뺄 것 / 보조 정보)
  blue: "#DDE5EA",
  blueInk: "#3A4A55",
  blueInk2: "#6B7D89",
  blueInk3: "#7B8D99",

  // 경고 코랄 (성분 충돌·파괴적 액션)
  warnBg: "#FBEDE9",
  warn: "#D8705D",
  warnInk: "#B4543F",
  warnInk2: "#C0715C",
  warnInk3: "#C58273",
  warnBody: "#8C5A4B",
  warnSource: "#BC9084",

  // 텍스트 위계
  ink1: "#2F332F",
  ink2: "#8E8D84",
  ink3: "#9A998F",
  ink4: "#A6A59C",
  inkIcon: "#8B8B84",

  // 오버레이 및 특수
  onGreen: "#FFFFFF",
  onGreenDim: "rgba(255, 255, 255, .75)",
  hairline: "rgba(255, 255, 255, .22)",
  veil: "rgba(255, 255, 255, .18)",
  scrim: "rgba(47, 51, 47, .42)",

  // 카메라 뷰
  cam: "#3A3D3A",
  camGlow: "#4A4E4A",
};

export const theme = { fonts, colors, flex };
