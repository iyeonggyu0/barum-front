import { useSearchParams } from "react-router-dom";
import WeatherBoxSkeleton from "./SkeletonItem";
import { weatherBoxStyle } from "./WeatherBox.style";

const WeatherBox = ({ isLoading, data }) => {
  const [searchParams] = useSearchParams();

  const m = searchParams.get("m");
  const d = searchParams.get("d");

  console.log(data);
  if (isLoading) {
    return <WeatherBoxSkeleton />;
  }

  return (
    <section css={weatherBoxStyle}>
      {/* 상단 */}
      <div className="title-box">
        {/* 텍스트 */}
        <div className="title">
          <p className="loc">
            {m}월 {d}일의 날씨
          </p>
          <p className="text">{data.summary || ""}</p>
        </div>
        {/* 온도 */}
        <div>
          <p className="temp">{Math.round(data.temp)}°</p>
          <p className="humidity">습도 {Math.round(data.humidity)}%</p>
        </div>
      </div>
    </section>
  );
};
export default WeatherBox;
