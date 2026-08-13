import { useGetWeatherQuery } from "../../hooks/useGetWeatherQuery";
import WeatherBoxSkeleton from "./SkeletonItem";
import { weatherBoxErrorStyle, weatherBoxStyle } from "./WeatherBox.style";
import { requestLocationPermission } from "@/utils/requestLocation";

const WeatherBox = () => {
  const { data, isLoading, locationError, statusCode, retry, isRefetching } = useGetWeatherQuery();

  console.log(statusCode);

  const getPm10Label = () => {
    if (data.pm10 <= 30) return "좋음";
    if (data.pm10 <= 80) return "보통";
    if (data.pm10 <= 150) return "나쁨";
    return "매우 나쁨";
  };

  /**
   * 초미세먼지 (PM2.5) 등급 변환
   */
  const getPm25Label = () => {
    if (data.pm25 <= 15) return "좋음";
    if (data.pm25 <= 35) return "보통";
    if (data.pm25 <= 75) return "나쁨";
    return "매우 나쁨";
  };

  const handleRequestLocation = async () => {
    try {
      const coords = await requestLocationPermission();
      console.log("위치 획득 성공! 위도:", coords.lat, "경도:", coords.lon);

      retry();
    } catch (error) {
      alert(error.message);
    }
  };

  const isWeatherLoading = isLoading || isRefetching || (!data && !locationError && !statusCode);

  if (isWeatherLoading) {
    return <WeatherBoxSkeleton />;
  }

  return (
    <div>
      {/* 정상처리 */}
      {!isLoading && !locationError && data && (statusCode !== 500 || statusCode !== 502) && (
        <section css={weatherBoxStyle}>
          {/* 상단 */}
          <div className="title-box">
            {/* 텍스트 */}
            <div className="title">
              <p className="loc">{data.regionLabel || ""} 기준ㆍ오늘의 날씨</p>
              <p className="text">{data.summary || ""}</p>
            </div>
            {/* 온도 */}
            <div className="temp">{Math.round(data.temp)}°</div>
          </div>

          {/* 하단 */}
          <div className="data-box">
            <div>
              <p>습도</p>
              <p>{Math.round(data.humidity)}%</p>
            </div>
            <div>
              <p>미세 먼지</p>
              <p>{getPm10Label()}</p>
            </div>
            <div>
              <p>초미세먼지</p>
              <p>{getPm25Label()}</p>
            </div>
          </div>
        </section>
      )}

      {/* 에러 처리 */}
      {locationError && (
        <section css={weatherBoxErrorStyle}>
          <div className="text-box">
            <p>위치 정보 조회에 실패했습니다.</p>
            <p>GPS 권한에 동의해 주세요</p>
          </div>
          <div className="button" onClick={handleRequestLocation}>
            다시 시도
          </div>
        </section>
      )}

      {!isLoading && statusCode === 500 && (
        <section css={weatherBoxErrorStyle}>
          <div className="text-box">
            <p css={{ color: "#cb4848 !important" }}>Error</p>
            <p>서버에 오류가 생겼습니다.</p>
          </div>
          <div className="button" onClick={() => retry()}>
            다시 시도
          </div>
        </section>
      )}

      {!isLoading && statusCode === 502 && (
        <section css={weatherBoxErrorStyle}>
          <div className="text-box">
            <p>{data?.regionLabel || ""} 기준ㆍ오늘의 날씨</p>
            <p>날씨 정보를 불러오지 못했습니다.</p>
          </div>
          <div className="button" onClick={() => retry()}>
            다시 시도
          </div>
        </section>
      )}
    </div>
  );
};
export default WeatherBox;
