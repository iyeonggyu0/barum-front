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
    <section css={[{ minHeight: "206.562px" }, weatherBoxStyle]}>
      {/* 상단 영역 스켈레톤 */}
      <div className="title-box" css={{ minHeight: "74.375px" }}>
        <div className="title">
          {/* 지역 기준 라벨 스켈레톤 */}
          <div css={[weatherSkeletonItemStyle, { width: "90px", height: "14px", marginBottom: "12px" }]} />
          {/* 날씨 요약 텍스트 스켈레톤 */}
          <div css={[weatherSkeletonItemStyle, { width: "140px", height: "24px" }]} />
        </div>
        {/* 온도 스켈레톤 (크게) */}
        <div css={[weatherSkeletonItemStyle, { width: "65px", height: "50px", borderRadius: "12px" }]} />
      </div>

      {/* 하단 상세 데이터 영역 스켈레톤 */}
      <div className="data-box">
        {/* 습도, 미세먼지, 초미세먼지 3칸을 배열로 간단하게 렌더링 */}
        {[1, 2, 3].map((item) => (
          <div key={item}>
            {/* 상단 제목 (습도 등) */}
            <div css={[weatherSkeletonItemStyle, { width: "45px", height: "12px", marginBottom: "8px" }]} />
            {/* 하단 값 (50%, 좋음 등) */}
            <div css={[weatherSkeletonItemStyle, { width: "55px", height: "16px" }]} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherBoxSkeleton;
