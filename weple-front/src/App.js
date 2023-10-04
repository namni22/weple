import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";
import Join from "./component/member/Join";

function App() {
  return (
    <div className="weple-wrap">
      <div className="weple-content">
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/meet/*" element={<MeetMain />}></Route>
          <Route path="/board/*" element={<Board />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/join/*" element={<Join />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
