import { Route, Routes } from "react-router-dom";
import { HomePage, NotFound, Record, RoutineSelfie } from "@/pages";

function App() {
  return (
    <section css={{ height: "100%" }}>
      {/* portfolio */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 셀카 촬영 */}
        <Route path="/routine/create/selfie" element={<RoutineSelfie />} />
        <Route path="/routine/create/loading" element={<HomePage />} />
        <Route path="/routine/create/result/:id" element={<HomePage />} />
        {/* ?error_type로 받아서 분기 */}
        <Route path="/routine/create/error" element={<HomePage />} />

        {/* 화장대 */}
        <Route path="/makeup" element={<HomePage />} />
        {/* 추가 */}
        {/* - 검색 */}
        {/* - 전성분 */}
        {/* - 전성분 - 결과확인 */}
        {/* - 전성분 - 에러 */}

        {/* 기록 */}
        <Route path="/record" element={<Record />} />
        {/* 상세보기 */}

        {/* 설정 */}
        <Route path="/setting" element={<HomePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default App;
