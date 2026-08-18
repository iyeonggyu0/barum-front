import api from "@/api";

export const getSearchList = async (name, page = 0, category = "") => {
  console.log("실행");

  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { makeupSearchMockup } = await import("@/mockup/makeupSearchMockup.js");
    // 스켈레톤 UI 테스트를 위한 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let filteredItems = makeupSearchMockup.items;

    // 1. 카테고리 필터링 (카테고리가 선택된 경우 먼저 필터링)
    if (category) {
      filteredItems = filteredItems.filter((item) => item.category === category);
    }

    // 2. 검색어(name) 필터링 (제품명 또는 브랜드명)
    if (name) {
      filteredItems = filteredItems.filter((item) => item.name.includes(name) || item.brand.includes(name));
    }

    // 3. 페이지네이션 적용 (단위: 20)
    const SIZE = 20;
    const startIndex = page * SIZE;
    const endIndex = startIndex + SIZE;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // 4. 페이지네이션 및 필터링된 결과로 응답 객체 재구성
    return {
      ...makeupSearchMockup,
      items: paginatedItems,
      page: page,
      size: SIZE,
      totalElements: filteredItems.length, // 필터링된 전체 아이템 개수
    };
  }

  // 실제 API 호출 로직
  // category가 빈 문자열일 때 URL에 '&false'가 들어가는 것을 방지
  const categoryQuery = category ? `&category=${category}` : "";
  const res = await api.get(`/catalog/products?q=${name || ""}&page=${page}${categoryQuery}`);

  return res.data || {};
};
