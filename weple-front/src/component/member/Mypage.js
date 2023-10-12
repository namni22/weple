import { useEffect, useState } from "react";
import Profile from "./Profile";
import "./mypage.css";
import SideMenu from "../util/SideMenu";
import AdminBoard from "../admin/AdminBoard";
import AdminReport from "../admin/AdminReport";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import ModifyInfo from "./ModifyInfo";

const Mypage = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [menus, setMenus] = useState([
    { url: "", text: "프로필", active: true },
    { url: "modifyInfo", text: "정보 수정", active: false },
    { url: "myCalendar", text: "캘린더", active: false },
    { url: "alarm", text: "알림", active: false },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
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
        console.log(subCategory);
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
        <SideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route
              path=""
              element={
                <Profile
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  mainCategory={mainCategory}
                  setMainCategory={setMainCategory}
                />
              }
            />
            <Route
              path="modifyInfo"
              element={
                <ModifyInfo
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="myCalendar" element={<AdminReport />} />
            <Route path="alarm" element={<AdminReport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Mypage;
