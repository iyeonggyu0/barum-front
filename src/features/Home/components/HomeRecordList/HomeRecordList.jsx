import { RecordList } from "@/components";
import { homeRecordListStyle } from "./HomeRecordList.stlye";
import { useNavigate } from "react-router-dom";
import { useGetHomeRecord } from "../../hooks/useGetHomeRecord";

const HomeRecordList = () => {
  const {
    data: listData,
    isLoading: isListDataLoading,
    isError: isListDataError,
  } = useGetHomeRecord({
    // enabled: !!selectedUniv,
  });

  console.log(listData, isListDataLoading, isListDataError);
  const nav = useNavigate();
  return (
    <section css={homeRecordListStyle}>
      <div className="title-box">
        <span className="title">최근 기록</span>
        <span className="button" onClick={() => nav("/record")}>
          전체 보기
        </span>
      </div>
      {/* 리스트 */}
      {!isListDataLoading && !isListDataError && listData && <RecordList listData={listData} />}
    </section>
  );
};
export default HomeRecordList;
