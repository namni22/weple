import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";

import Header from "./component/common/Header";
import Category from "./component/common/Category";
import Join from "./component/member/Join";
import Review from "./component/review/Review";
import Login from "./component/member/Login";
import { useState } from "react";
import { useEffect } from "react";
import Mypage from "./component/member/Mypage";
import ReviewList from "./component/review/ReviewList";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
      setId("");
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="weple-wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} setId={setId} />
      <div className="weple-content">
        <Routes>
          <Route
            path="/mypage/*"
            element={
              <Mypage isLogin={isLogin} setIsLogin={setIsLogin} setId={setId} />
            }
          />
          <Route path="/feed/*" element={<Feed isLogin={isLogin} id={id} />} />
          <Route
            path="/meet/*"
            element={<MeetMain isLogin={isLogin} />}
          ></Route>
          <Route path="/board/*" element={<Board />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/login"
            element={<Login setIsLogin={setIsLogin} setId={setId} />}
          />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/reviewList" element={<ReviewList />} />
          {/* <Route path="/category" element={<Category />} /> */}

          <Route path="*" element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
