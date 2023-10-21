import { Route, Routes } from "react-router-dom";
import "./component/common/common.css";
import Feed from "./component/feed/Feed";
import Main from "./component/common/Main";
import Footer from "./component/common/Footer";
import MeetMain from "./component/meet/MeetMain";
import Board from "./component/board/Board";
import Admin from "./component/admin/Admin";
import Header from "./component/common/Header";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState } from "react";
import { useEffect } from "react";
import Mypage from "./component/member/Mypage";
import FindId from "./component/member/FindId";
import ReviewMain from "./component/review/ReviewMain";
import FindPw from "./component/member/FindPw";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
      //사용안함
      setId("");
    } else {
      const chkAdmin = window.localStorage.getItem("chkAdmin");
      if (chkAdmin == 0) {
        setIsAdmin(true);
      }
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="weple-wrap">
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setId={setId}
        isAdmin={isAdmin}
      />
      <div className="weple-content">
        <Routes>
          <Route
            path="/mypage/*"
            element={
              <Mypage
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setId={setId}
                isAdmin={isAdmin}
              />
            }
          />
          <Route
            path="/feed/*"
            element={<Feed isLogin={isLogin} isAdmin={isAdmin} />}
          />
          <Route
            path="/meet/*"
            element={
              <MeetMain isLogin={isLogin} setIsLogin={setIsLogin} id={id} />
            }
          ></Route>
          <Route
            path="/board/*"
            element={<Board isLogin={isLogin} />}
          />

          <Route
            path="/admin/*"
            element={
              <Admin
                isLogin={isLogin}               
                setIsAdmin={setIsAdmin}
                setIsLogin={setIsLogin}
              />
            }
          />
          <Route path="/join" element={<Join />} />
          <Route
            path="/login"
            element={
              <Login
                setIsLogin={setIsLogin}
                setId={setId}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPw" element={<FindPw />} />
          {/* <Route path="/category" element={<Category />} /> */}
          <Route
            path="/review/*"
            element={<ReviewMain isLogin={isLogin} isAdmin={isAdmin} />}
          />
          <Route path="*" element={<Main isLogin={isLogin} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
