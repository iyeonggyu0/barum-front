import { HomeLayout } from "@/layouts";
import { getTodayFormatted } from "@/utils/getTodayFormatted";
import { homePageStyle } from "./Home.style";
import { WeatherBox } from "@/features/Home/components";

const HomePage = () => {
  const todayString = getTodayFormatted();

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
      </section>
    </HomeLayout>
  );
};
export default HomePage;
