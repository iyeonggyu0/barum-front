import { RecordList } from "@/components";
import { recordRecordListStyle } from "./RecordRecordList.style";
import { useGetRecordList } from "../../hooks/useGetRecordList";

const RecordRecordList = () => {
  const { data: listData, isLoading: isListDataLoading, isError: isListDataError } = useGetRecordList();

  return (
    <section css={recordRecordListStyle}>
      <RecordList listData={listData} isLoading={isListDataLoading} isError={isListDataError} skeletonCount={5} />
    </section>
  );
};

export default RecordRecordList;
