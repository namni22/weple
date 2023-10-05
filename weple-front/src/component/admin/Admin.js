import { Route, Routes } from "react-router-dom";
import "./admin.css";
import AdminSideMenu from "./AdminSideMenu";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import AdminBoard from "./AdminBoard";
import AdminReport from "./AdminReport";
import AdminMember from "./AdminMember";
import AdminMeeting from "./AdminMeeting";


const Admin = () => {
  const [menus, setMenus] = useState([

    { url: "insertBoard", text: "공지 등록", active: false },
    { url: "boardList", text: "공지 목록", active: false },
    { url: "reportList", text: "신고 내역", active: false },
    { url: "memberList", text: "회원목록", active: false },
    { url: "meetList", text: "모임 신청 내역", active: false },
  ]);

  return (
    <div className="admin-all-wrap">


      <div className="admin-content">
        <AdminSideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="insertBoard" element={<BoardFrm />} />
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