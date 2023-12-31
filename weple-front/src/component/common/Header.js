import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useState } from "react";
import ReviewReport from "../review/ReviewReport";

const Header = (props) => {
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const moveSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/search", { state: { searchWord: searchWord } });
    } else {
      setSearchWord(e.target.value);
    }
  };
  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-left">
          <div>
            <Link to="/meet/category">
              <div className="material-icons" id="category">
                menu
              </div>
            </Link>
          </div>
          {/* <span class="material-icons bar">maximize</span> */}
          <div className="logo">
            <Link to="/">
              <img src="../img/weple-logo.png" />
            </Link>
          </div>
        </div>
        <div className="header-mid">
          <input
            className="searchFrm"
            placeholder="지금 생각나는 취미를 검색하세요."
            onKeyDown={moveSearch}
          ></input>
        </div>
        <div className="icons header-right">
          <div className="icon-wrap">
            <Link to="/feed">
              <div className="material-icons feed">note_alt</div>
              <div className="icon-explain">피드</div>
            </Link>
          </div>
          <div className="icon-wrap">
            <Link to="/memberMeet">
              <div className="material-icons meet">diversity_1</div>
              <div className="icon-explain">모임</div>
            </Link>
          </div>
          {isLogin ? (
            isAdmin ? (
              <div className="icon-wrap">
                <Link to="/admin/boardList">
                  <div className="material-icons admin">
                    admin_panel_settings
                  </div>
                  <div className="icon-explain">관리자</div>
                </Link>
              </div>
            ) : (
              <div className="icon-wrap">
                <Link to="/mypage/profile/myFeed">
                  <div className="material-icons mypage">contact_page</div>
                  <div className="icon-explain">마이</div>
                </Link>
              </div>
            )
          ) : (
            <div className="icon-wrap">
              <Link to="/login">
                <div className="material-icons login">login</div>
                <div className="icon-explain">로그인</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
