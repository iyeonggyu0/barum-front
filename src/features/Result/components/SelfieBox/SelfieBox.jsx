import { keyframes } from "@emotion/react"; // keyframes 임포트 추가
import { theme } from "@/styles/theme";

// 반짝이는(Shimmer) 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const SelfieBox = ({ isLoading, data }) => {
  const isLoadingStyle = {
    width: "100%",
    height: "60px",
    borderRadius: "30px",
    // 스켈레톤 배경색상 및 그라데이션 설정 (theme에 맞춰 색상 변경 가능)
    background: "linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0 40%, #e5e5e5 48%)",
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1.5s infinite linear`, // 애니메이션 무한 반복
  };

  const noDataStyle = {
    width: "100%",
    height: "60px",
    borderRadius: "30px",
    ...theme.flex.center,
    background: `repeating-linear-gradient(
      -45deg,
      ${theme.colors.bg},
      ${theme.colors.bg} 8px,
      ${theme.colors.surfaceMuted} 8px,
      ${theme.colors.surfaceMuted} 16px
    )`,
    "& span": {
      padding: "4px 12px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      ...theme.fonts.nano,
    },
  };

  const style = {
    position: "relative",
    "& img": {
      width: "100%",
      height: "190px",
      borderRadius: "30px",
      objectFit: "cover",
      margin: "0, auto",
    },
    "& .selfie-text": {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      padding: "4px 12px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      ...theme.fonts.nano,
    },

    "& span.text": {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      textAlign: "end",
      ...theme.fonts.caption_tab,
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",

      color: "#fff",
    },
  };

  if (isLoading) {
    // 텍스트를 지우고 스켈레톤 박스만 렌더링되게 수정
    return <div css={isLoadingStyle} />;
  }

  if (data.img === "none" || !data) {
    return (
      <div css={noDataStyle}>
        <span>이미지 없음</span>
      </div>
    );
  }

  return (
    <div css={style}>
      <span className="selfie-text">그날의 셀카</span>
      <img src={data.img} alt="이미지 로딩 오류" />
      <span className="text">{data.text}</span>
    </div>
  );
};

export default SelfieBox;
