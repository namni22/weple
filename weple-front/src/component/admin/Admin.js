import { Route, Routes } from "react-router-dom";
import "./admin.css";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import BoardAll from "../board/BoardList";
import AdminReport from "./AdminReport";
import AdminMember from "./AdminMember";
import AdminMeeting from "./AdminMeeting";
import SideMenu from "../util/SideMenu";

const Admin = (props) => {
  // const token = window.localStorage.getItem("token");
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;
  const setIsLogin = props.setIsLogin;
  const setIsAdmin = props.setIsAdmin;

  const [menus, setMenus] = useState([
    { url: "boardList", text: "공지 목록", active: true },
    { url: "insertBoard", text: "공지 등록", active: false },
    { url: "reportList", text: "신고 내역", active: false },
    { url: "memberList", text: "회원 목록", active: false },
    { url: "meetList", text: "모임 신청 내역", active: false },
  ]);

  return (
    <div className="admin-all-wrap">
      <div className="admin-content">
        <SideMenu
          isAdmin={isAdmin}
          menus={menus}
          setMenus={setMenus}
          setIsAdmin={setIsAdmin}
          setIsLogin={setIsLogin}
        />
        <div className="current-content">
          <Routes>
            <Route
              path="insertBoard"
              element={<BoardFrm isLogin={isLogin} />}
            />
            <Route path="boardList" element={<BoardAll />} />
            <Route path="reportList" element={<AdminReport />} />
            <Route path="memberList" element={<AdminMember />} />
            <Route path="meetList" element={<AdminMeeting />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Admin;
