import { theme } from "@/styles/theme";
import { css, keyframes } from "@emotion/react";

// 1. 스켈레톤 깜빡임 애니메이션 정의
const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { opacity: 0.3; }
`;

// 2. 스켈레톤 공통 스타일 정의
const skeletonItemStyle = css({
  backgroundColor: "#e2e2e2", // 하얀색 배경 위에서 어울리는 회색
  borderRadius: "4px",
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

const style = css({
  width: "100%",

  "& .title-box": {
    ...theme.flex.rowBetween,
    width: "100%",
    marginBottom: "12px",

    "& .title": {
      ...theme.fonts.section,
      color: theme.colors.ink1,
    },

    "& .sub": {
      ...theme.fonts.micro,
      color: theme.colors.ink3,
    },
  },

  "& .list-box": {
    ...theme.flex.colStart,
    gap: "8px",
  },

  "& .item": {
    ...theme.flex.rowBetween,
    alignItems: "center",
    padding: "14px 18px",
    borderRadius: "22px",
    backgroundColor: "#fff",
    gap: "12px",

    "& .order": {
      maxWidth: "22px",
      minWidth: "22px",
      maxHeight: "22px",
      minHeight: "22px",
      borderRadius: "999px",
      backgroundColor: theme.colors.greenSoft,
      color: theme.colors.greenInk,
      ...theme.fonts.micro,
      ...theme.flex.center,
      fontWeight: "650",
    },

    "& .name": {
      flex: 1,
      ...theme.fonts.body,
      fontWeight: "650",
    },

    "& .reason": {
      flex: 1,
      ...theme.fonts.micro,
      color: theme.colors.ink2,
      textAlign: "end",
    },
  },
});

const ApplyBox = ({ isLoading, data = [] }) => {
  return (
    <section css={style}>
      <div className="title-box">
        <span className="title">바를 것</span>
        <span className="sub">{isLoading ? "불러오는 중..." : `${data.length} 단계`}</span>
      </div>

      {/* 데이터 렌더링 */}
      {!isLoading && data.length !== 0 && (
        <div className="list-box">
          {[...data]
            .sort((a, b) => a.order - b.order)
            .map((item, idx) => (
              <div className="item" key={idx}>
                <span className="order">{item.order}</span>
                <p className="name">{item.name}</p>
                <span className="reason">{item.reason}</span>
              </div>
            ))}
        </div>
      )}

      {/* 로딩 스켈레톤 UI */}
      {isLoading && (
        <div className="list-box">
          {[1, 2, 3].map((item) => (
            <div className="item" key={item}>
              {/* order 동그라미 스켈레톤 */}
              <div css={[skeletonItemStyle, { width: "22px", height: "22px", borderRadius: "999px" }]} />

              {/* name 영역 스켈레톤 (flex 영역 내부에서 width 비율 차지) */}
              <div css={{ flex: 1 }}>
                <div css={[skeletonItemStyle, { width: "60%", height: "16px" }]} />
              </div>

              <div css={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <div css={[skeletonItemStyle, { width: "45%", height: "12px" }]} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && data.length === 0 && (
        <div className="item">
          <span className="order">0</span>
          <p className="name">추천될만한 아이템이 없어요</p>
        </div>
      )}
    </section>
  );
};

export default ApplyBox;
