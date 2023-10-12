import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2 } from "../util/Button";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;
  const location = useLocation();
  console.log(member.memberImage);

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
        <div className="profile-info">
          <div className="name">{member.memberName}</div>
          <div className="intro">소개소개 입니다.</div>
        </div>
        <div className="like">{member.memberLike}</div>
        <div className="prefer">
          <span>음식</span>
          <span>베이킹</span>
        </div>
      </div>
      <div className="profile-mid">
        <Button1 text="피드" clickEvent="/"></Button1>
        <Button2 text="모임" clickEvent="/"></Button2>
      </div>
      <div className="profile-bottom">
        {/* 피드 */}
        {/* 모임 */}
      </div>
    </div>
  );
};
export default Profile;
