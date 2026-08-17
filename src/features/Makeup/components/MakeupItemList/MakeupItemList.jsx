import { BarButton } from "@/components";
import MakeupItem from "../MakeupItem/MakeupItem";
import { noneDataStyle } from "./MakeupItemList.style";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const MakeupItemList = ({ listData = [], isLoading = false, isError = false, skeletonCount = 5 }) => {
  const hasData = Array.isArray(listData) && listData.length > 0;
  const nav = useNavigate();
  return (
    <section css={{ ...theme.flex.colStart, gap: "16px", height: "100%" }}>
      {/* 1. 로딩 중일 때 스켈레톤 표시 */}
      {isLoading && Array.from({ length: skeletonCount }).map((_, idx) => <MakeupItem key={`record-skeleton-${idx}`} isSkeleton />)}

      {/* 2. 로딩이 끝났는데 데이터가 없을 때 (빈 화면) */}
      {!isLoading && !isError && !hasData && (
        <div css={noneDataStyle}>
          <div className="icon">
            <div className="bar_1"></div>
            <div className="bar_2"></div>
            <div className="bar_3"></div>
          </div>
          <div>
            <p className="title">첫 제품을 등록해 보세요</p>
            <p className="sub">
              화장대에 제품이 있어야 오늘의 루틴을 만들 수 있어요.
              <br />
              검색하거나 전성분표를 찍어서 추가할 수 있어요.
            </p>
          </div>
          <div className="button-box">
            <BarButton clickFun={() => nav("/routine/create/selfie")}>제품 추가</BarButton>
          </div>
        </div>
      )}

      {/* 3. 로딩이 끝나고 데이터가 있을 때 */}
      {!isLoading && hasData && listData.map((item, idx) => <MakeupItem key={`${item?.date || "record"}-${idx}`} data={item} />)}
    </section>
  );
};
export default MakeupItemList;
