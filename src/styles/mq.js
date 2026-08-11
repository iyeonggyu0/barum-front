/**
 * 반응형 미디어 쿼리 기준이 되는 브레이크포인트(px)
 */
// pc, tablet, mobile 명칭으로 변경
const breakpoints = { QHD: 2560, UHD: 3800, pc: 1200, tablet: 1024, mobile: 768 };

/**
 * 브레이크포인트를 기반으로 미디어 쿼리 문자열을 생성
 * - QHD/UHD: min-width
 * - pc/tablet/mobile: max-width
 * 예: mq("mobile") -> "@media (max-width: 768px)"
 */
const minWidthLabels = new Set(["QHD", "UHD", "pc"]);

export const mq = (label) => {
  const value = breakpoints[label];
  if (!value) return "";
  // 모바일만 768px 미만으로 동작하도록 변경
  if (label === "mobile") {
    return `@media (max-width: 767px)`;
  }
  return minWidthLabels.has(label) ? `@media (min-width: ${value}px)` : `@media (max-width: ${value}px)`;
};
