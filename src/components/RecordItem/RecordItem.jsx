import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { recordItemStyle } from "./RecordItem.style";

const RecordItem = ({ data }) => {
  console.log(data);

  const formatToMonthDay = (dateString) => {
    // 예외 처리: 데이터가 없거나 올바르지 않은 형식이면 빈 문자열 반환
    if (!dateString || typeof dateString !== "string") return "";

    // "-"를 기준으로 문자열을 배열로 나눔 (['2026', '08', '11'])
    const [, month, day] = dateString.split("-");

    // parseInt(숫자, 10진수)를 사용하여 "08"을 "8"로 변환
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <div css={recordItemStyle}>
      {data?.thumbnailUrl !== null && <img src={data?.thumbnailUrl} alt="이미지" />}
      {data?.thumbnailUrl === null && <div className="noneImg"></div>}
      <div className="text-box">
        <p className="date">
          {formatToMonthDay(data?.date)}
          {data?.hasConflict && <span className="hasConflict">충돌 !</span>}
        </p>
        <p className="data">{data?.weatherSummary}</p>
        <p className="data">{data?.routineSummary}</p>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className="icon" />
    </div>
  );
};
export default RecordItem;
