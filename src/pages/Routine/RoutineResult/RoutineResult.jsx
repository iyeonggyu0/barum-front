import {} from "@/components";
import { HomeLayout } from "@/layouts";
import { useSearchParams } from "react-router-dom";
import { routineResultStyle } from "./RoutineResult.style";

const RoutineResult = () => {
  const [searchParams] = useSearchParams();

  const y = searchParams.get("y");
  const m = searchParams.get("m");
  const d = searchParams.get("d");

  // 요일
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const dayIndex = dateObj.getDay();
  const dayName = weekDays[dayIndex];

  return (
    <HomeLayout>
      <section css={routineResultStyle}></section>
    </HomeLayout>
  );
};
export default RoutineResult;
