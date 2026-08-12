// src/layouts/MobileFrame/MobileFrame.jsx
/** @jsxImportSource @emotion/react */
import { useMedia } from "@/hooks/useMedia";
import { background, mobileContainer } from "./MobileFrame.style";

const MobileFrame = ({ children }) => {
  const { isMobile } = useMedia();
  return (
    <div css={!isMobile ? background : {}}>
      <main css={mobileContainer(isMobile)}>{children}</main>
    </div>
  );
};

export default MobileFrame;
