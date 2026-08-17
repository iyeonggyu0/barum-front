import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { recordItemStyle } from "./RecordItem.style";
import { useNavigate } from "react-router-dom"; // useLocation 추가

const RecordItem = ({ data, isSkeleton = false }) => {
  const nav = useNavigate();

  if (isSkeleton) {
    return (
      <div css={recordItemStyle} className="skeleton" aria-hidden="true">
        <div className="skeleton-thumb" />
        <div className="text-box">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-icon" />
      </div>
    );
  }

  let y = "";
  let m = "";
  let d = "";

  if (data?.date) {
    const [year, month, day] = data.date.split("-");
    y = year;
    m = month;
    d = day;
  }

  // 경로에 따른 이동 로직 분리
  const handleClick = () => {
    nav(`/record/result?y=${y}&m=${m}&d=${d}`);
  };

  return (
    <div css={recordItemStyle} onClick={handleClick}>
      {data?.thumbnailUrl !== null && <img src={data?.thumbnailUrl} alt="이미지" />}
      {data?.thumbnailUrl === null && <div className="noneImg"></div>}
      <div className="text-box">
        <p className="date">
          {m && d ? `${m}월 ${d}일` : ""}
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
