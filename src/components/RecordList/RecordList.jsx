import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { BarButton, RecordItem } from "..";
import { useNavigate } from "react-router-dom";

const noneDataStyle = css({
  height: "100%",
  width: "100%",
  ...theme.flex.colCenter,
  alignItems: "center",
  textAlign: "center",
  gap: "36px",

  "& .icon": {
    minHeight: "160px",
    maxHeight: "160px",
    minWidth: "160px",
    maxWidth: "160px",
    backgroundColor: theme.colors.greenSoft,
    borderRadius: "999px",
    ...theme.flex.colCenter,
    alignItems: "center",
    gap: "8px",

    "& .bar_1": {
      width: "70px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_2": {
      width: "88px",
      backgroundColor: theme.colors.green,
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_3": {
      width: "60px",
      backgroundColor: theme.colors.blue,
      borderRadius: "999px",
      height: "22px",
    },
  },

  "& .title": {
    ...theme.fonts.titleM,
    marginBottom: "8px",
  },

  "& .sub": {
    ...theme.fonts.sub,
    color: theme.colors.ink2,
  },

  "& .button-box": {
    width: "100%",
    padding: "0 18px",
  },
});

const RecordList = ({ listData = [], isLoading = false, isError = false, skeletonCount = 2 }) => {
  const hasData = Array.isArray(listData) && listData.length > 0;

  const nav = useNavigate();

  return (
    <section css={{ ...theme.flex.colStart, gap: "16px", height: "100%" }}>
      {/* 1. 로딩 중일 때 스켈레톤 표시 */}
      {isLoading && Array.from({ length: skeletonCount }).map((_, idx) => <RecordItem key={`record-skeleton-${idx}`} isSkeleton />)}

      {/* 2. 로딩이 끝났는데 데이터가 없을 때 (빈 화면) */}
      {!isLoading && !isError && !hasData && (
        <div css={noneDataStyle}>
          <div className="icon">
            <div className="bar_1"></div>
            <div className="bar_2"></div>
            <div className="bar_3"></div>
          </div>
          <div>
            <p className="title">첫 기록을 남겨보세요</p>
            <p className="sub">오늘의 루틴을 받고 저장하면 여기에 날짜별로 쌓여요</p>
          </div>
          <div className="button-box">
            <BarButton clickFun={() => nav("/routine/create/selfie")}>오늘의 루틴 받기</BarButton>
          </div>
        </div>
      )}

      {/* 3. 로딩이 끝나고 데이터가 있을 때 */}
      {!isLoading && hasData && listData.map((item, idx) => <RecordItem key={`${item?.date || "record"}-${idx}`} data={item} />)}
    </section>
  );
};

export default RecordList;
