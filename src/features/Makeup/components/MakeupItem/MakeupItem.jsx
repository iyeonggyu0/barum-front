import { makeupItemStyle } from "./MakeupItem.style";

const MakeupItem = ({ data, isSkeleton = false }) => {
  if (isSkeleton) {
    return (
      <div css={makeupItemStyle} className="skeleton" aria-hidden="true">
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

  const CATEGORY_MAP = {
    CLEANSER: "클렌저",
    TONER: "토너",
    SERUM: "세럼",
    CREAM: "크림",
    SUNSCREEN: "선크림",
  };

  return (
    <div css={makeupItemStyle}>
      {data?.source === "SAMPLE" && <div className="ex">체험용</div>}
      {data?.imageUrl && <img src={data?.imageUrl} alt="이미지" />}
      {!data?.imageUrl && <div className="noneImg"></div>}
      <div className="text-box">
        <p className="type">
          {data?.brand}ㆍ{CATEGORY_MAP[data?.category]}
        </p>
        <p className="name">{data?.name}</p>
        <p>
          {data?.keyIngredients?.map((item, idx) => (
            <span className="ingredient" key={idx}>
              {item}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
export default MakeupItem;
