import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const setId = props.setId;
  const logout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
    setId("");
  };
  return (
    <div className="header">
      <div className="header-inner">
        <Link to="/meet/category">
          <div className="icon-wrap">
            <div className="material-icons" id="category">
              menu
            </div>
          </div>
        </Link>
        {/* <span class="material-icons bar">maximize</span> */}
        <div className="logo">
          <Link to="/" onClick={logout}>
            Weple
          </Link>
        </div>
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
            <Link to="/">
              <div className="material-icons meet">diversity_1</div>
              <div className="icon-explain">모임</div>
            </Link>
          </div>
          {isLogin ? (
            <div className="icon-wrap">
              <Link to="/mypage">
                <div className="material-icons mypage">contact_page</div>
                <div className="icon-explain">마이</div>
              </Link>
            </div>
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
