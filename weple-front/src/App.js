import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import MeetMain from "./component/meet/MeetMain";

function App() {
  return (
    <div className="weple-wrap">
      {/* 헤더삽입 */}
      <div className="weple-content">
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/meet/*" element={<MeetMain />}></Route>
        </Routes>
      </div>
      {/* 푸터삽입 */}
    </div>
  );
}

export default App;
