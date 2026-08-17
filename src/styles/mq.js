/**
 * 반응형 미디어 쿼리 기준이 되는 브레이크포인트(px)
 */
// pc, tablet, mobile 명칭으로 변경
const breakpoints = { QHD: 2560, UHD: 3800, pc: 900, tablet: 899, mobile: 768 };

/**
 * 브레이크포인트를 기반으로 미디어 쿼리 문자열을 생성
 * - QHD/UHD: min-width
 * - pc/tablet/mobile: max-width
 * 예: mq("mobile") -> "@media (max-width: 1199px)"
 */
const minWidthLabels = new Set(["QHD", "UHD", "pc"]);

export const mq = (label) => {
  const value = breakpoints[label];
  if (!value) return "";

  // 모바일을 PC 사이즈(1200px) 미만인 1199px 이하로 동작하도록 변경 (태블릿 범위 포함)
  if (label === "mobile") {
    return `@media (max-width: 899px)`;
  }

  return minWidthLabels.has(label) ? `@media (min-width: ${value}px)` : `@media (max-width: ${value}px)`;
};
