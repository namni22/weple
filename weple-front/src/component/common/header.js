import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="category icon-wrap">
        <div class="material-icons">menu</div>
        <div className="icon-explain">카테고리</div>
      </div>
      {/* <span class="material-icons bar">maximize</span> */}
      <Link to="/">
        <div className="logo">Weple</div>
      </Link>

      <input
        className="searchFrm"
        placeholder="지금 생각나는 취미를 검색하세요."
      ></input>
      <div className="icons">
        <div className="icon-wrap">
          <Link to="/feed">
            <div className="material-icons feed">note_alt</div>
            <div className="icon-explain">피드</div>
          </Link>
        </div>
        <div className="icon-wrap">
          <Link to="/meet">
            <div className="material-icons meet">diversity_1</div>
            <div className="icon-explain">모임</div>
          </Link>
          {/* 회원가입 */}
        </div>
        <div className="icon-wrap">
          <Link to="/join">
            <div className="material-icons mypage">contact_page</div>
            <div className="icon-explain">마이</div>
          </Link>
          {/* 로그인 */}
        </div>
      </div>
    </div>
  );
};

export default Header;
