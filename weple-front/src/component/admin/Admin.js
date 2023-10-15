import { Route, Routes } from "react-router-dom";
import "./admin.css";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import AdminBoard from "./AdminBoard";
import AdminReport from "./AdminReport";
import AdminMember from "./AdminMember";
import AdminMeeting from "./AdminMeeting";
import SideMenu from "../util/SideMenu";

const Admin = (props) => {
  const token = window.localStorage.getItem("token");
  console.log("token In Admin : " + token);
 const isLogin= props.isLogin;
 console.log("props in Admin : " + props.isLogin);
 console.log("id in Admin : " + props.id);

  const id = props.id; 
  const [menus, setMenus] = useState([
    { url: "insertBoard", text: "공지 등록", active: false },
    { url: "boardList", text: "공지 목록", active: false },
    { url: "reportList", text: "신고 내역", active: false },
    { url: "memberList", text: "회원 목록", active: false },
    { url: "meetList", text: "모임 신청 내역", active: false },
  ]);

  return (
    <div className="admin-all-wrap">
      <div className="admin-content">
        <SideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="insertBoard" element={<BoardFrm isLogin={isLogin} id={id} />} />
            <Route path="boardList" element={<AdminBoard />} />
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
