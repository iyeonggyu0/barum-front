import { useMediaQuery } from "react-responsive";

/**
 * 사용자의 해상도를 감지하여 리턴함
 * @returns isPc, isMobile 각 T/F로 반환
 */
export const useMedia = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1200px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return { isPc, isTablet, isMobile };
};
