import { HomeLayout } from "@/layouts";
import { getTodayFormatted } from "@/utils/getTodayFormatted";
import { homePageStyle } from "./Home.style";
import { HomeRecordList, WeatherBox } from "@/features/Home/components";
import { BarButton } from "@/components";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const todayString = getTodayFormatted();
  const nav = useNavigate();

  return (
    <HomeLayout>
      <section css={homePageStyle}>
        {/* 타이틀 박스 시작 */}
        <div className="title-box home">
          <p className="date">{todayString}</p>
          <p className="title">오늘 뭘 바를까요</p>
        </div>
        {/* 타이틀 박스 종료 */}

        {/* 날씨 박스 */}
        <WeatherBox />
        <BarButton clickFun={() => nav("/routine/create/selfie")}>오늘의 루틴 받기</BarButton>

        {/* 기록 */}
        <HomeRecordList />
      </section>
    </HomeLayout>
  );
};
export default HomePage;
