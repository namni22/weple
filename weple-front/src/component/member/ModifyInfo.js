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

  return (
    <div className="joinFrm">
      <div className="joinFrm-content">
        <JoinInputWrap label="아이디" />
        <JoinInputWrap label="비밀번호" />
        <JoinInputWrap label="이름" />
        <JoinInputWrap label="전화번호" />
        <JoinInputWrap label="생년월일" />
        <JoinInputWrap label="이메일" />

        <div className="join-input-wrap">
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
              />
            </div>
          </div>
        </div>

        <div className="join-input-wrap">
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
          <Button1 text="회원가입" />
        </div>
      </div>
    </div>
  );
};

const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const es = props.es;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const placeholder = props.placeholder;
  const msgClass = props.msgClass;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input"></div>
      </div>
    </div>
  );
};

export default ModifyInfo;
