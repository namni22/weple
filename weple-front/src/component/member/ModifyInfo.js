import "./modifyInfo.css";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ModifyInfo = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selected, setSelected] = useState();
  const [subInformation, setSubInformation] = useState([]);
  const [subTag, setSubTag] = useState([]);
  // 대표 사진 바꿨을 때 사용
  const [profileImg, setProfileImg] = useState({});
  // 화면용 memberImage -> 썸네일 미리보기용
  const [memberImage, setMemberImage] = useState(member.memberImage);

  const setMemberPhone = (data) => {
    member.memberPhone = data;
    setMember({ ...member });
  };

  const setMemberBirth = (data) => {
    member.memberBirth = data;
    setMember({ ...member });
  };

  const setMemberEmail = (data) => {
    member.memberEmail = data;
    setMember({ ...member });
  };

  // 대표 사진 바꿀 시 미리보기 변경 함수
  const profileImgChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setProfileImg(files[0]); // 썸네일 파일 전송을 위한 state에 파일 객체 저장
      // 화면 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setMemberImage(reader.result);
      };
    } else {
      setProfileImg({});
      setMemberImage(null);
    }
  };

  return (
    <div className="modifyInfo-wrap">
      <div className="modifyInfo-content">
        <ModifyInputWrap
          label="아이디"
          type="text"
          data={member.memberId}
          readOnly
        />
        <ModifyInputWrap
          label="이름"
          type="text"
          data={member.memberName}
          readOnly
        />
        <ModifyInputWrap
          content="memberPhone"
          label="전화번호"
          type="text"
          data={member.memberPhone}
          setData={setMemberPhone}
        />
        <ModifyInputWrap
          content="memberBirth"
          label="생년월일"
          type="text"
          data={member.memberBirth}
          setData={setMemberBirth}
        />
        <ModifyInputWrap
          content="memberEmail"
          label="이메일"
          type="text"
          data={member.memberEmail}
          setData={setMemberEmail}
        />
        <div className="modifyInfo-info">
          <div>
            <div className="label">
              <label htmlFor="memberImage">대표 이미지</label>
            </div>
            <div className="input">
              <div className="join-profileImg-pre">
                {member.memberImage === null ? (
                  <img src="/img/testImg_01.png" />
                ) : (
                  <img src={"/member/" + member.memberImage} />
                )}
              </div>
              <label className="join-profileImg" htmlFor="memberImage">
                이미지 업로드
              </label>
              <input
                type="file"
                className="join-imgUp-btn"
                id="memberImage"
                accept="image/*"
                onChange={profileImgChange}
              />
            </div>
          </div>
        </div>

        <div className="modifyInfo-info">
          <div>
            <div className="label">
              <label htmlFor="memberImage">관심 카테고리</label>
            </div>
            <div className="input">
              <select id="main-category" defaultValue="default">
                <option value="default" disabled>
                  대분류
                </option>
                {mainCategory.map((main, index) => {
                  return (
                    <option key={"main" + index} value={main.categoryNo}>
                      {main.categoryName}
                    </option>
                  );
                })}
              </select>
              <select
                id="sub-category"
                name="categoryNo"
                defaultValue="default"
              >
                <option value="default" disabled>
                  소분류
                </option>
                {subCategory.map((sub, index) => {
                  return (
                    <option key={"sub" + index} value={sub.categoryNo}>
                      {sub.categoryName}
                    </option>
                  );
                })}
              </select>
              <div className="join-select-print-box">
                {subTag.map((subT, index) => {
                  return (
                    <div key={"subT" + index}>
                      <img src="/img/hashtag.png" />
                      {subT}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="join-agree-btn">
        <div>
          <Button2 text="취소" />
        </div>
        <div>
          <Button1 text="수정" />
        </div>
      </div>
    </div>
  );
};

const ModifyInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const es = props.es;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const placeholder = props.placeholder;
  const readOnly = props.readOnly;
  const msgClass = props.msgClass;

  return (
    <div className="modifyInfo-info">
      <div>
        <div className="label">
          <label>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifyInfo;
