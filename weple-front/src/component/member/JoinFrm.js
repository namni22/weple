import { useState } from "react";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Button";
import axios from "axios";

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
  const [useId, setUseId] = useState("false");

  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;

    if (!idReg.test(memberId)) {
      // 정규표현식 만족하지 못했을 때
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자 입니다.");
    } else {
      // 정규표현식 만족했을 때 -> DB 중복체크
      // 비동기 통신 도와주는 것 : axios
      // axios.보내주는 방식(get or post)
      // params라는 key값, 객체 value
      /*
        $.ajax({
          url:"/member/checkId",
          data:{memberId:memberId},
          type:"get",
          success: function(data{
          },
          error: function(data){
          }
        })
        형태를 axios를 쓰면 ↓
      */
      axios
        // .get("/member/checkId", { params: { memberId: memberId } }) 방법 1
        // then: success, catch: error
        .get("/member/checkId/" + memberId) // 방법 2
        .then((res) => {
          console.log(res.data); // 응답 객체의 data속성이 Controller에서 리턴한 데이터
          if (res.data == 0) {
            setCheckIdMsg("사용 가능한 아이디 입니다.");
            setUseId("true");
          } else {
            setCheckIdMsg("이미 사용중인 아이디입니다.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
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
          blurEvent={idCheck}
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
          placeholder="ex) weple@weple.co.kr"
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
              <input
                type="file"
                className="join-imgUp-btn"
                id="memberImage"
                accept="image/*"
              />
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
