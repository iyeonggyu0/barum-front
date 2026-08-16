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

  return (
    <div css={makeupItemStyle}>
      {data?.imageUrl && <img src={data?.imageUrl} alt="이미지" />}
      {!data?.imageUrl && <div className="noneImg"></div>}
      <div className="text-box">
        <p className="type">
          {data?.brand}ㆍ{data?.category}
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
