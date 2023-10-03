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
      <div className="logo">Weple</div>
      <input
        className="searchFrm"
        placeholder="지금 생각나는 취미를 검색하세요."
      ></input>
      <div className="icons">
        <div className="icon-wrap">
          <div className="material-icons feed">note_alt</div>
          <div className="icon-explain">피드</div>
        </div>
        <div className="icon-wrap">
          <Link to="/meet">           
          <div className="material-icons meet">diversity_1</div>
          <div className="icon-explain">모임</div>
          </Link>
          {/* 회원가입 */}
        </div>
        <div className="icon-wrap">
          <div className="material-icons mypage">contact_page</div>
          <div className="icon-explain">마이</div>
          {/* 로그인 */}
        </div>
      </div>
    </div>
  );
};

export default Header;
