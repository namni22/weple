import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";
import Join from "./component/member/Join";
import CategoriMain from "./component/categori/CategoriMain";
import Header from "./component/common/Header";

function App() {
  return (
    <div className="weple-wrap">
      <Header />
      <div className="weple-content">
        {/* <ReviewWriteFrm /> */}
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/meet/*" element={<MeetMain />}></Route>
          <Route path="/categori" element={<CategoriMain />}></Route>
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
