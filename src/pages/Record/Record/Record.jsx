import { HomeLayout } from "@/layouts";
import { RecordRecordList } from "@/features/Record/components";
import { recordPageStyle } from "./Record.style";

const Record = () => {
  return (
    <HomeLayout>
      <section css={recordPageStyle} className="test">
        {/* 타이틀 박스 시작 */}
        <div className="title-box record">
          <p className="title">기록</p>
          <p className="date">최대 15일</p>
        </div>

        {/* 기록 */}
        <RecordRecordList />
      </section>
    </HomeLayout>
  );
};
export default Record;
