/**
 * 라우트 변경 시 스크롤을 맨 위로 올려주는 커스텀 훅
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If Lenis smooth-scroller is present, use its API to scroll.
    // Lenis is created in `main.jsx` and exposed as `window.lenis`.
    try {
      if (window.lenis?.scrollTo) {
        // Lenis: perform immediate jump to top to avoid intermediate scroll toggles
        // `immediate: true` is supported by Lenis to skip animation
        try {
          window.lenis.scrollTo(0, { immediate: true });
          return;
        } catch (e) {
          // fallback to plain call if options not supported
          window.lenis.scrollTo(0);
          return;
        }
      }
    } catch (e) {
      // ignore and fallback to native
    }

    // Use instant native scroll to avoid intermediate header state changes
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
}
