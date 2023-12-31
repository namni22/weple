import { useEffect, useState } from "react";
import Profile from "./Profile";
import "./mypage.css";
import SideMenu from "../util/SideMenu";
import AdminBoard from "../admin/AdminBoard";
import AdminReport from "../admin/AdminReport";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import ModifyInfo from "./ModifyInfo";
import ModifyPw from "./ModifyPw";
import Payment from "../payment/Payment";
import Alarm from "./Alarm";
import MyCalendar from "./MyCalendar";
import BoardAll from "../board/BoardList";

const Mypage = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const setId = props.setId;
  const isAdmin = props.isAdmin;
  // const setIsAdmin = props.setIsAdmin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [myCategory, setMyCategory] = useState([]);

  const [menus, setMenus] = useState([
    { url: "profile/myFeed", text: "프로필", active: true },
    { url: "notice", text: "공지사항", active: false },
    { url: "modifyInfo", text: "정보 수정", active: false },
    { url: "modifyPw", text: "비밀번호 변경", active: false },
    { url: "myCalendar", text: "캘린더", active: false },
    { url: "payment", text: "결제", active: false },
    // { url: "alarm", text: "알림", active: false },
  ]);

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        // 회원이 선택한 카테고리 번호 문자열 , 기준으로 split
        // memberCategory가 현재 object로 생성된 string타입이어서 new String
        const data = res.data;
        const myCategoryNo = new String(data.memberCategory);
        const myCategoryNoList = myCategoryNo.split(",");
        myCategoryNoList.forEach((item) => {
          myCategory.push(item);
        });
        setMyCategory([...myCategory]);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/member/subcategory")
      .then((res) => {
        res.data.forEach((item) => {
          subCategory.push(item);
          setSubCategory([...subCategory]);
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/member/categoryList")
      .then((res) => {
        res.data.forEach((item) => {
          mainCategory.push(item);
          setMainCategory([...mainCategory]);
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="mypage-wrap">
      <div className="mypage-content">
        <SideMenu menus={menus} setMenus={setMenus} isAdmin={isAdmin} />
        <div className="current-content">
          <Routes>
            <Route
              path="profile/*"
              element={
                <Profile
                  member={member}
                  setMember={setMember}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  subCategory={subCategory}
                  myCategory={myCategory}
                  setId={setId}
                />
              }
            />
            <Route path="notice" element={<BoardAll />} />
            <Route
              path="modifyInfo"
              element={
                <ModifyInfo
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                  subCategory={subCategory}
                  myCategory={myCategory}
                />
              }
            />
            <Route path="modifyPw" element={<ModifyPw />} />
            <Route
              path="myCalendar"
              element={
                <MyCalendar isLogin={isLogin} memberNo={member.memberNo} />
              }
            />
            <Route path="payment" element={<Payment member={member} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Mypage;
