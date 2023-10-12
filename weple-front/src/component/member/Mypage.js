import { useState } from "react";
import Profile from "./Profile";
import "./mypage.css";
import SideMenu from "../util/SideMenu";
import AdminBoard from "../admin/AdminBoard";
import AdminReport from "../admin/AdminReport";
import { Route, Routes } from "react-router-dom";

const Mypage = () => {
  const [menus, setMenus] = useState([
    { url: "", text: "프로필", active: true },
    { url: "modifyInfo", text: "정보 수정", active: false },
    { url: "myCalendar", text: "캘린더", active: false },
    { url: "alarm", text: "알림", active: false },
  ]);
  return (
    <div className="mypage-wrap">
      <div className="mypage-content">
        <SideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="" element={<Profile />} />
            <Route path="modifyInfo" element={<AdminBoard />} />
            <Route path="myCalendar" element={<AdminReport />} />
            <Route path="alarm" element={<AdminReport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Mypage;
