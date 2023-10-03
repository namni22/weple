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
        { url: "listBoard", text: "공지 목록", active: false },
        { url: "listReport", text: "신고 내역", active: false },
      { url: "listMember", text: "회원목록", active: false },
      { url: "listMeetingassign", text: "모임 신청 내역", active: false },
      ]);

  return (
    <div className="admin-all-wrap">
   
         
      <div className="admin-content">
        <AdminSideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="insertBoard" element={<BoardFrm />} />
            <Route path="listBoard" element={<AdminBoard />} />
            <Route path="listReport" element={<AdminReport />} />
            <Route path="listMember" element={<AdminMember />} />
            <Route path="listMeetingassign" element={<AdminMeeting />} />
          </Routes>
        </div>
      </div>
              
   
    </div>
  );
};
export default Admin;