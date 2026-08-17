import { theme } from "@/styles/theme";
import { makeupSearchList, makeupSearchListItem } from "./MakeupSearchList.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { noneDataStyle } from "../MakeupItemList/MakeupItemList.style";

const MakeupSearchList = ({ data, selectList = [], page = 0, setPage = {}, setSelectList = {}, isLoading = true }) => {
  const CATEGORY_MAP = {
    CLEANSER: "클렌저",
    TONER: "토너",
    SERUM: "세럼",
    CREAM: "크림",
    SUNSCREEN: "선크림",
  };

  const PAGE_SIZE = 20;
  const totalElements = data?.totalElements || 0;
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

  const isFirstPage = page === 0;
  const isLastPage = page + 1 >= totalPages;

  return (
    <section css={{ width: "100%", flex: 1, minHeight: 0, ...theme.flex.colBetween }} className="MakeupSearchList">
      <div css={{ ...theme.flex.rowBetween, ...theme.fonts.caption, color: theme.colors.ink2, marginBottom: "4px" }}>
        <span>인기순</span>
        <span>총 {data?.totalElements || "0"}개</span>
      </div>

      {/* 로딩 중일 때 스켈레톤 UI 3개 렌더링 */}
      {isLoading && (
        <div css={makeupSearchList}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} css={makeupSearchListItem()} className="skeleton" aria-hidden="true">
              <div className="skeleton-thumb" />
              <div className="text-box">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
              <div className="skeleton-icon" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && data?.items.length === 0 && (
        <div css={noneDataStyle}>
          <div className="icon">
            <div className="bar_1"></div>
            <div className="bar_2"></div>
            <div className="bar_3"></div>
          </div>
          <div>
            <p className="title">찾는 제품이 없나요?</p>
            <p className="sub">
              전성분표 사진으로 등록해 보세요.
              <br />
              제품 뒷면이나 포장 박스를 찍으면 성분을 읽어 드려요.
            </p>
          </div>
        </div>
      )}

      {/* 로딩 완료 후 실제 데이터 렌더링 */}
      {!isLoading && data?.items.length > 0 && (
        <div css={makeupSearchList}>
          {data?.items?.map((item) => (
            <div
              onClick={() => {
                setSelectList((prevList) => {
                  if (prevList.includes(item.catalogId)) {
                    return prevList.filter((id) => id !== item.catalogId);
                  } else {
                    return [...prevList, item.catalogId];
                  }
                });
              }}
              key={item.catalogId}
              css={makeupSearchListItem(selectList.includes(item.catalogId))}>
              {data?.imageUrl ? <img src={data?.imageUrl} alt="이미지" /> : <div className="noneImg"></div>}

              <div className="text-box">
                <p className="type">
                  {item?.brand}ㆍ{CATEGORY_MAP[item?.category]}
                </p>
                <p className="name">{item?.name}</p>
                <p>
                  {item?.keyIngredients?.map((data, idx) => (
                    <span className="ingredient" key={idx}>
                      {data}
                    </span>
                  ))}
                </p>
              </div>
              <div className="checked">
                <FontAwesomeIcon icon={faCheck} className="icon" />
              </div>
            </div>
          ))}
          <div className="page-box">
            <span
              className={isFirstPage ? "button is-none" : "button"}
              onClick={() => {
                if (!isFirstPage) setPage(page - 1);
              }}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>

            <span>
              {page + 1} / {totalPages} 페이지
            </span>

            <span
              className={isLastPage ? "button is-none" : "button"}
              onClick={() => {
                if (!isLastPage) setPage(page + 1);
              }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
export default MakeupSearchList;
