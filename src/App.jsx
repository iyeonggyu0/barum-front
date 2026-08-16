import { Route, Routes } from "react-router-dom";
import { HomePage, MakeupList, NotFound, RecordList, RecordResult, RoutineError, RoutineLoading, RoutineResult, RoutineSelfie } from "@/pages";
import MakeupSelect from "./pages/Makeup/MakeupSelect/MakeupSelect";

function App() {
  return (
    <section css={{ height: "100%" }}>
      {/* portfolio */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 셀카 촬영 */}
        <Route path="/routine/create/selfie" element={<RoutineSelfie />} />
        <Route path="/routine/create/loading" element={<RoutineLoading />} />
        {/* ?error_type로 받아서 분기 */}
        <Route path="/routine/create/error" element={<RoutineError />} />
        {/* 결과 페이지 */}
        <Route path="/routine/result" element={<RoutineResult />} />

        {/* 화장대 */}
        <Route path="/makeup" element={<MakeupList />} />
        {/* 방법 선택 */}
        <Route path="/makeup/create/select" element={<MakeupSelect />} />
        {/* 검색 */}
        <Route path="/makeup/create/search" element={<MakeupList />} />
        {/* 카메라 */}
        <Route path="/makeup/create/camera" element={<MakeupList />} />
        {/* 결과확인 */}
        <Route path="/makeup/create/camera/result" element={<MakeupList />} />
        {/* 에러 */}
        <Route path="/makeup/create/error" element={<MakeupList />} />

        {/* 기록 */}
        <Route path="/record" element={<RecordList />} />
        <Route path="/record/result" element={<RecordResult />} />

        {/* 상세보기 */}

        {/* 설정 */}
        <Route path="/setting" element={<HomePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default App;
