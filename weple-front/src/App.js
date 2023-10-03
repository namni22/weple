import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";

import MeetMain from "./component/meet/MeetMain";

import Header from "./component/common/header";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";


function App() {
  return (
    <div className="weple-wrap">
      <Header />
      <div className="weple-content">
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/meet/*" element={<MeetMain />}></Route>
          <Route path="/header" element={<Header />} />
          <Route path="/board/*" element={<Board />}/>
          <Route path="/admin/*" element={<Admin />}/>
        </Routes>
      </div>
      {/* 푸터삽입 */}
    </div>
  );
}

export default App;
