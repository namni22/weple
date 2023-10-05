import { useState } from "react";
import Input from "../util/InputFrm";
import { initial } from "lodash";
import Radio from "../util/Radio";
import { Button1, Button2 } from "../util/Button";

const JoinFrm = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberBirth, setMemberBirth] = useState("");
  const [memberGender, setMemberGender] = useState("");
  const [memberImage, setMemberImage] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");

  return (
    <div className="joinFrm">
      <div className="joinFrm-content">
        <JoinInputWrap
          data={memberId}
          setData={setMemberId}
          type="type"
          content="memberId"
          label="아이디"
          es=" *"
          checkMsg={checkIdMsg}
          placeholder="아이디를 입력해주세요"
        />
        <JoinInputWrap
          data={memberPw}
          setData={setMemberPw}
          type="password"
          content="memberPw"
          label="비밀번호"
          es=" *"
          placeholder="비밀번호를 입력해주세요"
        />
        <JoinInputWrap
          data={memberPwRe}
          setData={setMemberPwRe}
          type="password"
          content="memberPwRe"
          label="비밀번호 확인"
          es=" *"
          checkMsg={checkPwMsg}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        />
        <JoinInputWrap
          data={memberName}
          setData={setMemberName}
          type="type"
          content="memberName"
          label="이름"
          es=" *"
        />
        <JoinInputWrap
          data={memberPhone}
          setData={setMemberPhone}
          type="type"
          content="memberPhone"
          label="전화번호"
          es=" *"
        />

        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label>
                성별
                <span className="join-essential"> *</span>
              </label>
            </div>
            <div className="input">
              <input type="radio" value="M" id="male" name="memberGender" />
              <label htmlFor="male">남자</label>
              <input type="radio" value="F" id="female" name="memberGender" />
              <label htmlFor="female">여자</label>
            </div>
          </div>
        </div>

        <JoinInputWrap
          data={memberBirth}
          setData={setMemberBirth}
          type="type"
          content="memberBirth"
          label="생년월일"
          es=" *"
          placeholder="ex) 900101"
        />
        <JoinInputWrap
          data={memberEmail}
          setData={setMemberEmail}
          type="type"
          content="memberEmail"
          label="이메일"
          es=" *"
        />

        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label htmlFor="memberImage">
                대표 이미지
                <span className="join-essential"> *</span>
              </label>
            </div>
            <div className="input">
              <div className="join-profileImg-pre">
                <img src="/img/testImg_01.png" />
              </div>
              <label className="join-profileImg" htmlFor="memberImage">
                이미지 업로드
              </label>
              <input type="file" id="memberImage" accept="image/*" />
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

/*
const JoinRadio = (props) => {
  const data = props.data;
  const setData = props.setData;
  const content = props.content;
  const label = props.label;

  return (
    <div className="radio">
      <Radio data={data} setData={setData} content={content} />
      <div className="radio-label">
        <label htmlFor={content}>{label}</label>
      </div>
    </div>
  );
};
*/

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

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>
            {label}
            <span className="join-essential">{es}</span>
          </label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default JoinFrm;
