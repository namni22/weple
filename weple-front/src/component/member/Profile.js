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
  const mainCategory = props.mainCategory;
  const setMainCategory = props.setMainCategory;
  const subCategory = props.subCategory;
  const setSubCategory = props.setSubCategory;
  const [categoryNameList, setCategoryNameList] = useState([]);
  const myCategory = props.myCategory;

  const location = useLocation();

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
          console.log(categoryNameList);
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
        <div className="profile-info">
          <div className="name">{member.memberName}</div>
          <div className="intro">소개소개 입니다.</div>
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
