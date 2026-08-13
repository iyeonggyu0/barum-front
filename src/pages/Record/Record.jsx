import { HomeLayout } from "@/layouts";
import { getTodayFormatted } from "@/utils/getTodayFormatted";
import { useNavigate } from "react-router-dom";
import { recordPageStyle } from "./Record.style";

const Record = () => {
  const nav = useNavigate();

  return (
    <HomeLayout>
      <section css={recordPageStyle}>
        {/* 타이틀 박스 시작 */}
        <div className="title-box record">
          <p className="title">기록</p>
          <p className="date"></p>
        </div>

        {/* 기록 */}
        {/* <HomeRecordList /> */}
      </section>
    </HomeLayout>
  );
};
export default Record;
