import { HomeLayout } from "@/layouts";
import { makeupPageStyle } from "./MakeupList.style";
import { MakeupItemList } from "@/features/Makeup/components";
import { useGetMakeupList } from "@/features/Makeup/hooks/useGetMakeupList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { useDeleteProduct } from "@/features/Makeup/hooks/useDeleteProduct";

const MakeupList = () => {
  const { data: listData, isLoading: isListDataLoading, isError: isListDataError } = useGetMakeupList();
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      setDeletingProductId(null);
    },
    onError: (error) => {
      setDeletingProductId(null);
      alert(error?.response?.data?.message || error?.message || "제품 삭제 중 오류가 발생했습니다.");
    },
  });

  const nav = useNavigate();

  const deleteStyle = css({
    padding: "8px",
    borderRadius: "999px",
    backgroundColor: deleteMode ? theme.colors.warn : theme.colors.warnSource,
    color: theme.colors.warnBg,
    cursor: "pointer",
  });

  const handleDeleteItem = (item) => {
    const productId = item?.productId;
    if (!productId) {
      return;
    }

    const confirmed = window.confirm(`"${item?.name || "선택한 제품"}"을(를) 삭제할까요?`);
    if (!confirmed) {
      return;
    }

    setDeletingProductId(productId);
    deleteProduct(productId);
  };

  return (
    <HomeLayout>
      <section css={makeupPageStyle}>
        <div className="makeup">
          <div className="title-box">
            <p className="title">화장대</p>
            <p className="date"> {!isListDataLoading && !isListDataError ? `제품 ${listData.length}개` : "제품 로딩중"}</p>
          </div>
          <div css={{ ...theme.flex.rowEnd, gap: "8px" }}>
            <div onClick={() => setDeleteMode(!deleteMode)} className="delete" css={deleteStyle}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className="plus" onClick={() => nav("/makeup/create/select")}>
              + 제품 추가
            </div>
          </div>
        </div>

        {/* 목록 */}
        <MakeupItemList
          deleteMode={deleteMode}
          listData={listData}
          isLoading={isListDataLoading}
          isError={isListDataError}
          onDeleteItem={handleDeleteItem}
          deletingProductId={deletingProductId}
        />
      </section>
    </HomeLayout>
  );
};
export default MakeupList;
