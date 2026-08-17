import { css, keyframes } from "@emotion/react";
import { weatherBoxStyle } from "./WeatherBox.style";

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`;

const WeatherBoxSkeleton = () => {
  const weatherSkeletonItemStyle = css({
    backgroundColor: "rgba(255, 255, 255, 0.4)", // 초록색 배경 위에서 자연스러운 반투명 흰색
    borderRadius: "4px",
    animation: `${pulse} 1.5s ease-in-out infinite`,
  });

  return (
    <section css={[{ minHeight: "174.56px" }, weatherBoxStyle]}>
      {/* 상단 영역 스켈레톤 */}
      <div className="title-box">
        {/* 왼쪽: 날짜 및 날씨 텍스트 */}
        <div className="title" css={{ display: "flex", flexDirection: "column" }}>
          {/* 날짜 라벨 (08월 13일의 날씨) */}
          <div css={[weatherSkeletonItemStyle, { width: "90px", height: "12px", marginBottom: "14px" }]} />

          {/* 날씨 요약 텍스트 1줄 (건조하고 미세먼지) */}
          <div css={[weatherSkeletonItemStyle, { width: "130px", height: "20px", marginBottom: "8px" }]} />

          {/* 날씨 요약 텍스트 2줄 (보통이에요) */}
          <div css={[weatherSkeletonItemStyle, { width: "80px", height: "20px" }]} />
        </div>

        {/* 오른쪽: 온도 및 습도 */}
        <div css={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {/* 온도 (29°) */}
          <div css={[weatherSkeletonItemStyle, { width: "45px", height: "36px", borderRadius: "8px", marginBottom: "10px" }]} />

          {/* 습도 (습도 38%) */}
          <div css={[weatherSkeletonItemStyle, { width: "50px", height: "12px" }]} />
        </div>
      </div>

      {/* 하단: 상세 데이터 영역 스켈레톤 (턱 주변 트러블이 보여요) */}
      <div className="data-box" css={{ display: "flex", alignItems: "center" }}>
        <div css={[weatherSkeletonItemStyle, { width: "160px", height: "18px", marginTop: "2px" }]} />
      </div>
    </section>
  );
};

export default WeatherBoxSkeleton;
