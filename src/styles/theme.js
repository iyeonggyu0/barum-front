// import { css } from "@emotion/react";
// import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const flex = {
  rowEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  rowStart: {
    display: "flex",
    justifyContent: "flex-start",
    // alignItems: "center",
  },

  colStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "center",
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

export const colors = {
  // 배경 / 표면
  bgApp: "#E9E7E1", // --brm-bg-app
  bg: "#F5F3EE", // --brm-bg
  surface: "#FFFFFF", // --brm-surface
  surfaceMuted: "#EBE9E3", // --brm-surface-muted
  line: "#F1EFE9", // --brm-line
  lineStrong: "#DDDBD3", // --brm-line-strong

  // 메인 그린 (세이지)
  green: "#7F9483", // --brm-green
  greenInk: "#5F7466", // --brm-green-ink
  greenSoft: "#EDF0EA", // --brm-green-soft
  greenBadge: "#E4E8E1", // --brm-green-badge
  greenDot: "#8AA08C", // --brm-green-dot
  greenDeep: "#3C4A40", // --brm-green-deep
  greenDeepHover: "#2F3A32", // --brm-green-deep-hover

  // 뮤트 블루 (뺄 것 / 보조 정보)
  blue: "#DDE5EA", // --brm-blue
  blueInk: "#3A4A55", // --brm-blue-ink
  blueInk2: "#6B7D89", // --brm-blue-ink-2
  blueInk3: "#7B8D99", // --brm-blue-ink-3

  // 경고 코랄 (성분 충돌·파괴적 액션)
  warnBg: "#FBEDE9", // --brm-warn-bg
  warn: "#D8705D", // --brm-warn
  warnInk: "#B4543F", // --brm-warn-ink
  warnInk2: "#C0715C", // --brm-warn-ink-2
  warnInk3: "#C58273", // --brm-warn-ink-3
  warnBody: "#8C5A4B", // --brm-warn-body
  warnSource: "#BC9084", // --brm-warn-source

  // 텍스트 위계
  ink1: "#2F332F", // --brm-ink-1
  ink2: "#8E8D84", // --brm-ink-2
  ink3: "#9A998F", // --brm-ink-3
  ink4: "#A6A59C", // --brm-ink-4
  inkIcon: "#8B8B84", // --brm-ink-icon

  // 오버레이 및 특수
  onGreen: "#FFFFFF", // --brm-on-green
  onGreenDim: "rgba(255, 255, 255, .75)", // --brm-on-green-dim
  hairline: "rgba(255, 255, 255, .22)", // --brm-hairline
  veil: "rgba(255, 255, 255, .18)", // --brm-veil
  scrim: "rgba(47, 51, 47, .42)", // --brm-scrim

  // 카메라 뷰
  cam: "#3A3D3A", // --brm-cam
  camGlow: "#4A4E4A", // --brm-cam-glow
};

const shadow = {
  boxShadow: "0 4px 24px rgba(53, 60, 55, .05)",
};

// import { css } from "@emotion/react";
// import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const theme = { fonts, colors, flex, shadow };
