import "./sideMenu.css";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;
  const setIsLogin = props.setIsLogin;
  const setIsAdmin = props.setIsAdmin;
  const navigate = useNavigate();
  const activeTab = (index) => {
    menus.forEach((item) => {
      item.active = false;
    });
    menus[index].active = true;
    setMenus([...menus]);
  };
  //logout function
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("chkAdmin");
    setIsLogin(false);
    setIsAdmin(false);
    navigate("/");
  };
  return (
    <div className="side-menu">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"menu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              ) : (
                <Link
                  to={menu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              )}
            </li>
          );
        })}
        <li>
          <Link to={"/"} onClick={logout}>
            로그아웃
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
