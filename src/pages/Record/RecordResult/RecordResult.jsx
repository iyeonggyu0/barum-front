import { LeftButton } from "@/components";
import { BasicLayout, HomeLayout } from "@/layouts";
import { useSearchParams } from "react-router-dom";
import { layoutStyle, recordResultStyle } from "./RecordResult.style";
import { ApplyBox, CrashBox, SelfieBox, WeatherBox } from "@/features/Result/components";
import { useGetRecordDetails } from "@/features/Result/hooks/useGetRecordList";

const RecordResult = () => {
  const [searchParams] = useSearchParams();

  const y = searchParams.get("y");
  const m = searchParams.get("m");
  const d = searchParams.get("d");

  // 요일
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const dayIndex = dateObj.getDay();
  const dayName = weekDays[dayIndex];

  const isDateValid = y && m && d;

  const formattedDate = isDateValid ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : null;

  const { data, isLoading, isError } = useGetRecordDetails(formattedDate, {
    enabled: !!isDateValid,
  });

  return (
    <BasicLayout styleObj={layoutStyle}>
      <header>
        <div className="left-box">
          <LeftButton />
          <p>
            {m}월 {d}일 {dayName}요일
          </p>
        </div>
        <span className="delete">삭제</span>
      </header>
      <section css={recordResultStyle}>
        {/* 셀카 */}
        {!isError && (
          <SelfieBox
            isLoading={isLoading}
            data={{
              img: data?.selfieUrl || "none",
              text: data?.skin?.summary || "",
            }}
          />
        )}

        {/* 날씨 */}
        {!isError && <WeatherBox isLoading={isLoading} data={data?.weather || {}} />}

        {/* 충돌 crash */}
        {!isError && <CrashBox isLoading={isLoading} data={data?.conflicts || []} />}

        {/* 뺄것 */}
        {!isError && <ApplyBox isLoading={isLoading} data={data?.routine?.apply || []} />}
      </section>
    </BasicLayout>
  );
};
export default RecordResult;
