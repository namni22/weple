import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Button";
import "./profile.css";
import { useEffect, useState } from "react";

import MyFeed from "./MyFeed";
import MyMeet from "./MyMeet";
const Profile = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const memberId = member.memberId;
  const memberNo = member.memberNo;
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const isAdmin = props.isAdmin;
  const setId = props.setId;
  const subCategory = props.subCategory;
  const [categoryNameList, setCategoryNameList] = useState([]);
  const myCategory = props.myCategory;

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("chkAdmin");
    setIsLogin(false);
    setId("");
    navigate("/");
  };

  useEffect(() => {
    // 내가 선택한 카테고리 이름 배열 만들기
    myCategory.forEach((item) => {
      console.log("아이템" + item);
      subCategory.forEach((ct) => {
        if (item == ct.categoryNo) {
          if (ct.categoryName === "기타") {
            if (ct.categoryRefNo === 1) {
              categoryNameList.push("스포츠");
            } else if (ct.categoryRefNo === 8) {
              categoryNameList.push("공예DIY");
            } else if (ct.categoryRefNo === 14) {
              categoryNameList.push("요리");
            } else if (ct.categoryRefNo === 19) {
              categoryNameList.push("문화예술");
            } else if (ct.categoryRefNo === 25) {
              categoryNameList.push("자기계발");
            } else if (ct.categoryRefNo === 30) {
              categoryNameList.push("여행");
            }
          } else {
            categoryNameList.push(ct.categoryName);
          }
          setCategoryNameList([...categoryNameList]);
        }
      });
    });
  }, [myCategory]);

  return (
    <div className="profile-wrap">
      <div className="profile-top">
        <div className="profile-img">
          {member.memberImage ? (
            <img src={"/member/" + member.memberImage} />
          ) : (
            <img src="/img/testImg_01.png" />
          )}
        </div>
        <div className="modifyAndLogout">
          <Button2 text="로그아웃" clickEvent={logout} />
        </div>
        <div className="profile-info">
          <div className="name">{member.memberName}</div>
        </div>
        <div className="like">{member.memberLike}˚C</div>
        <div className="prefer">
          {categoryNameList.map((ctName, index) => {
            return (
              <span key={"ctName" + index}>
                <img src="/img/hashtag.png" />
                {ctName}
              </span>
            );
          })}
        </div>
      </div>
      <div className="profile-tab-menu">
        <ProfileTab />
      </div>

      <div className="profile-tab-menu-content">
        <Routes>
          <Route
            path="myFeed"
            element={
              <MyFeed memberId={memberId} isLogin={isLogin} isAdmin={isAdmin} />
            }
          />
        </Routes>
        <Routes>
          <Route
            path="myMeet"
            element={<MyMeet memberId={memberId} memberNo={memberNo} />}
          />
        </Routes>
      </div>
    </div>
  );
};

const ProfileTab = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, setCurrentTab] = useState(0);
  const tabArr = [
    { name: "피드", content: "myFeed" },
    { name: "모임", content: "myMeet" },
  ];

  const selectMenuHandler = (index) => {
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    setCurrentTab(index);
  };

  return (
    <ul>
      {tabArr.map((tab, index) => {
        return (
          <li
            key={"tab" + index}
            className={index === currentTab ? "tabMenu clicked" : "tabMenu"}
            onClick={() => selectMenuHandler(index)}
          >
            <Link to={tab.content}>{tab.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Profile;
