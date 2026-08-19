import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeupItemStyle } from "./MakeupItem.style";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MakeupItem = ({ data, isSkeleton = false, deleteMode = false, onDelete, isDeleting = false }) => {
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
      {data?.source !== "SAMPLE" && deleteMode && (
        <button
          type="button"
          className="ex delete"
          onClick={(e) => {
            e.stopPropagation();
            if (isDeleting) return;
            onDelete?.(data);
          }}
          disabled={isDeleting}
          aria-label={isDeleting ? "제품 삭제 중" : "제품 삭제"}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
      {data?.imageUrl && <img src={data?.imageUrl} alt="이미지" />}
      {!data?.imageUrl && <div className="noneImg"></div>}
      <div className="text-box">
        {data?.brand && (
          <p className="type">
            {data?.brand}ㆍ{CATEGORY_MAP[data?.category]}
          </p>
        )}
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
