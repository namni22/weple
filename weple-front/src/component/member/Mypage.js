import { useState } from "react";
import Profile from "./Profile";
import "./mypage.css";

const Mypage = () => {
  const [menus, setMenus] = useState([
    { url: "", text: "프로필", active: true },
    { url: "modifyInfo", text: "정보 수정", active: false },
    { url: "myCalendar", text: "신고 내역", active: false },
    { url: "memberList", text: "회원 목록", active: false },
    { url: "meetList", text: "모임 신청 내역", active: false },
  ]);
  return (
    <div className="mypage-wrap">
      <Profile></Profile>
    </div>
  );
};
export default Mypage;
