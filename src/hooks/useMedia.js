import { useMediaQuery } from "react-responsive";

/**
 * 사용자의 해상도를 감지하여 리턴함
 * @returns isPc, isMobile 각 T/F로 반환
 */
export const useMedia = () => {
  const isPc = useMediaQuery({
    query: "(min-width:900px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:899px)",
  });

  // 태블릿 범위를 포함하도록 max-width를 1199px로 변경 (PC 시작점 직전까지)
  const isMobile = useMediaQuery({
    query: "(max-width:899px)",
  });

  return { isPc, isTablet, isMobile };
};
