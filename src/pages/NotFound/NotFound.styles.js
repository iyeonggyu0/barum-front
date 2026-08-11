import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const notFoundCss = css({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "64px 20px",

  position: "relative",
  overflow: "hidden",
  borderTop: `1px solid ${theme.colors.lightLine}`,
});

export const cardCss = css({
  position: "relative",
  zIndex: 1,
  width: "min(880px, 92vw)",
  padding: "48px 56px",
  borderRadius: "28px",
  border: `1px solid ${theme.colors.lightLine}`,
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.05)",
  backdropFilter: "blur(10px)",

  [mq("mobile")]: {
    padding: "36px 24px",
  },
});

export const codeCss = css({
  ...theme.fonts.titleXLg_B,
  fontSize: "clamp(72px, 12vw, 140px)",
  letterSpacing: "-0.04em",
  marginBottom: "8px",
  lineHeight: 1,
});

export const titleCss = css({
  ...theme.fonts.titleMd_B,
  fontSize: "clamp(22px, 3vw, 32px)",
  marginBottom: "14px",
});

export const descCss = css({
  ...theme.fonts.textLg,
  lineHeight: 1.6,
});

export const dividerCss = css({
  height: "1px",
  width: "100%",
  margin: "28px 0",
  background: `linear-gradient(90deg, transparent 0%, ${theme.colors.darkLine} 50%, transparent 100%)`,
  opacity: 0.7,
});

export const actionsCss = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
});

export const primaryBtnCss = css({
  padding: "12px 18px",
  borderRadius: "999px",
  background: "transparent",
  fontWeight: 600,
  border: `1px solid ${theme.colors.darkLine}`,
  textDecoration: "none",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.2)",
  },
});

export const ghostBtnCss = css({
  padding: "12px 18px",
  borderRadius: "999px",
  background: "transparent",
  border: `1px solid ${theme.colors.darkLine}`,
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.2s ease, border-color 0.2s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: theme.colors.lightLine,
  },
});

export const hintCss = css({
  marginTop: "24px",
  ...theme.fonts.captionLg,
  display: "flex",
  alignItems: "center",
  gap: "8px",

  "& .dot": {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    background: theme.colors.green,
  },
});
