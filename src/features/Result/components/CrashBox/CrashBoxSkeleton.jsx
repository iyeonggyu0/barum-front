import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`;

const CrashBoxSkeleton = () => {
  // AVOID(경고) 테마에 맞춘 붉은 계열의 스켈레톤 아이템 색상
  const crashSkeletonItemStyle = css({
    backgroundColor: "rgba(220, 53, 69, 0.15)", // 붉은 배경 위에서 자연스러운 반투명 붉은색
    borderRadius: "4px",
    animation: `${pulse} 1.5s ease-in-out infinite`,
  });

  return (
    <section
      css={css({
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.warnBg, // 기존 AVOID 테마 배경색 적용
        marginBottom: "8px",
        padding: "20px 24px",
        gap: "14px",
        borderRadius: "30px",
        width: "100%",
        minHeight: "156.77px", // 요청하신 기본 높이
      })}>
      {/* 좌측 아이콘 스켈레톤 */}
      <div
        css={[
          crashSkeletonItemStyle,
          {
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            marginTop: "12px",
            flexShrink: 0,
          },
        ]}
      />

      {/* 우측 텍스트 영역 스켈레톤 */}
      <div css={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
        {/* 상단 타이틀 및 이유보기 영역 */}
        <div css={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div css={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {/* 성분명 스켈레톤 (예: 레티놀 + 아스코빅애씨드) */}
            <div css={[crashSkeletonItemStyle, { width: "170px", height: "20px" }]} />
            {/* 라벨 스켈레톤 (예: 같이 쓰지 마세요) */}
            <div css={[crashSkeletonItemStyle, { width: "110px", height: "14px", marginBottom: "4px" }]} />
          </div>
          {/* 우측 이유 보기 링크 스켈레톤 */}
          <div css={[crashSkeletonItemStyle, { width: "50px", height: "14px", marginTop: "4px" }]} />
        </div>

        {/* 본문 설명 영역 스켈레톤 (자연스럽게 2줄로 표현) */}
        <div css={{ marginTop: "4px" }}>
          <div css={[crashSkeletonItemStyle, { width: "100%", height: "16px", marginBottom: "6px" }]} />
          <div css={[crashSkeletonItemStyle, { width: "65%", height: "16px", marginBottom: "8px" }]} />
        </div>

        {/* 하단 가이드 출처 영역 스켈레톤 */}
        <div css={[crashSkeletonItemStyle, { width: "160px", height: "12px", marginTop: "auto" }]} />
      </div>
    </section>
  );
};

export default CrashBoxSkeleton;
