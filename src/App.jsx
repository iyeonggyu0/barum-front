import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages";

function App() {
  return (
    <section>
      {/* portfolio */}
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default App;
