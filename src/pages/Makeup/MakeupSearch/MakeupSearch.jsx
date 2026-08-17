import { BarButton, LeftButton } from "@/components";
import { BasicLayout } from "@/layouts";
import { useNavigate } from "react-router-dom";
import { layoutStyle, makeupSelectStyle } from "./MakeupSearch.style";
import { MakeupCategory, MakeupSearchInput, MakeupSearchList } from "@/features/Makeup/components";
import { useInput } from "@/hooks/useInput";
import { useState } from "react";
import { useGetSearchList } from "@/features/Makeup/hooks/useGetSearchList";
import { usePostSearch } from "@/features/Makeup/hooks/usePostSearch";

const MakeupSearch = () => {
  const nav = useNavigate();

  // 1. 입력창에 보여지는 텍스트 상태
  const [inputData, onChangeInputData] = useInput("");

  // 2. 엔터를 쳤을 때 확정되어 API로 넘어갈 진짜 검색어 상태 추가!
  const [searchKeyword, setSearchKeyword] = useState("");

  const [category, setCategory] = useState("");
  const [selectList, setSelectList] = useState([]);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useGetSearchList(searchKeyword, page, category);

  const { mutate: registerProducts, isPending } = usePostSearch({
    onSuccess: (data) => {
      console.log(`${data.added}개 제품이 등록되었습니다.`, data.items);
      nav("/makeup");
    },
    onError: (error) => {
      console.error("제품 등록 실패:", error);
      alert("제품 등록에 실패했습니다.");
    },
  });

  const handleRegister = () => {
    if (selectList.length === 0) return;

    // API 요청 트리거 (mutationFn의 인자로 selectList가 들어감)
    registerProducts(selectList);
  };

  if (isError) {
    nav("/makeup/create/error");
  }

  const onEnter = () => {
    setSearchKeyword(inputData);
    setPage(0);
  };

  return (
    <BasicLayout styleObj={layoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <LeftButton />
        </span>
        제품 추가
      </header>

      <section css={makeupSelectStyle}>
        <MakeupSearchInput onEnter={onEnter} onChangeFun={onChangeInputData} />
        <MakeupCategory data={category} setData={setCategory} />
        <MakeupSearchList selectList={selectList} setSelectList={setSelectList} setPage={setPage} data={data} isLoading={isLoading} page={page} />
      </section>

      <nav>
        {data?.items.length > 0 && selectList.length > 0 && (
          <div onClick={handleRegister} disabled={isPending}>
            <BarButton>{isPending ? "등록 중..." : `${selectList.length}개 추가`}</BarButton>
          </div>
        )}
        {data?.items.length > 0 && selectList.length === 0 && <BarButton colorTheme="none">화장품을 선택하세요</BarButton>}

        {data?.items.length === 0 && (
          <div onClick={nav("/makeup/create/camera")}>
            <BarButton>전성분표 사진으로 등록</BarButton>
          </div>
        )}
      </nav>
    </BasicLayout>
  );
};

export default MakeupSearch;
