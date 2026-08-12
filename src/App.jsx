import { Route, Routes } from "react-router-dom";
import { HomePage, NotFound } from "./pages";

function App() {
  return (
    <section css={{ height: "100%" }}>
      {/* portfolio */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default App;
