import { HomeLayout } from "@/layouts";
import { makeupPageStyle } from "./MakeupList.style";
import { MakeupItemList } from "@/features/Makeup/components";
import { useGetMakeupList } from "@/features/Makeup/hooks/useGetMakeupList";
import { useNavigate } from "react-router-dom";

const MakeupList = () => {
  const { data: listData, isLoading: isListDataLoading, isError: isListDataError } = useGetMakeupList();

  const nav = useNavigate();

  return (
    <HomeLayout>
      <section css={makeupPageStyle}>
        <div className="makeup">
          <div className="title-box">
            <p className="title">화장대</p>
            <p className="date"> {!isListDataLoading && !isListDataError ? `제품 ${listData.length}개` : "제품 로딩중"}</p>
          </div>
          <div className="plus" onClick={() => nav("/makeup/create/select")}>
            + 제품 추가
          </div>
        </div>

        {/* 목록 */}
        <MakeupItemList listData={listData} isLoading={isListDataLoading} isError={isListDataError} />
      </section>
    </HomeLayout>
  );
};
export default MakeupList;
