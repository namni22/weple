import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Header from "./component/common/Header";
import ReviewWriteFrm from "./component/review/ReviewWriteFrm";


function App() {
  return (
    <div className="weple-wrap">
      <Header/>
      <div className="weple-content">
        <Main/>
        <Routes>
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/meet/*" element={<MeetMain />}></Route>
          <Route path="/board/*" element={<Board />}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
