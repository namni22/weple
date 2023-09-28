import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";

function App() {
  return (
    <div className="weple-wrap">
      {/* 헤더삽입 */}
      <div className="weple-content">
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
        </Routes>
      </div>
      {/* 푸터삽입 */}
    </div>
  );
}

export default App;
