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
  backgroundColor: "#e2e2e2",
  borderRadius: "4px",
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

const style = css({
  width: "100%",

  "& > .title-box": {
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
    backgroundColor: theme.colors.blue,
    gap: "12px",

    "& .title-box": {
      flex: 1,

      "& .title": {
        ...theme.fonts.body_B,
        color: theme.colors.blueInk,
      },
      "& .sub": {
        ...theme.fonts.micro,
        color: theme.colors.blueInk2,
        marginTop: "4px", // 제목과 설명 사이 간격 살짝 추가
      },
    },

    "& .minus": {
      maxWidth: "26px",
      minWidth: "26px",
      maxHeight: "26px",
      minHeight: "26px",
      borderRadius: "999px",
      backgroundColor: theme.colors.blueBg,
      color: theme.colors.blueInk,
      ...theme.fonts.micro,
      ...theme.flex.center,
      fontWeight: "650",
    },
  },
});

const SkipBox = ({ isLoading, data = [] }) => {
  return (
    <section css={style}>
      <div className="title-box">
        <span className="title">생략할 것</span> {/* '바를 것' 대신 상황에 맞게 수정 가능 */}
        <span className="sub">{isLoading ? "불러오는 중..." : `${data.length} 단계`}</span>
      </div>

      {/* 데이터 렌더링 */}
      {!isLoading && data.length !== 0 && (
        <div className="list-box">
          {[...data]
            .sort((a, b) => a.order - b.order)
            .map((item, idx) => (
              <div className="item" key={idx}>
                <div className="title-box">
                  <p className="title">{item.name}</p>
                  <p className="sub">{item.reason}</p>
                </div>
                <span className="minus">-</span>
              </div>
            ))}
        </div>
      )}

      {/* 로딩 스켈레톤 UI */}
      {isLoading && (
        <div className="list-box">
          {[1, 2].map((item) => (
            <div className="item" key={item}>
              {/* 좌측 텍스트 영역 스켈레톤 */}
              <div css={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* 타이틀 스켈레톤 */}
                <div css={[skeletonItemStyle, { width: "40%", height: "18px" }]} />
                {/* 서브 설명 스켈레톤 */}
                <div css={[skeletonItemStyle, { width: "70%", height: "14px" }]} />
              </div>

              {/* 우측 마이너스 버튼 스켈레톤 */}
              <div css={[skeletonItemStyle, { width: "26px", height: "26px", borderRadius: "999px" }]} />
            </div>
          ))}
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && data.length === 0 && (
        <div className="item">
          <div className="title-box">
            <p className="title">생략할 아이템이 없어요</p>
          </div>
          <span className="minus">-</span>
        </div>
      )}
    </section>
  );
};

export default SkipBox;
