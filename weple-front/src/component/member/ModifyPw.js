import { useNavigate } from "react-router-dom";
import "./modifyPw.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Button";

const ModifyPw = (props) => {
  const [isPwauth, setIsPwauth] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const token = window.localStorage.getItem("token");
  const pwCheck = () => {
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data === 1) {
          setIsPwauth(true);
        } else {
          Swal.fire({
            title: "비밀번호를 잘못 입력하셨습니다.",
          });
        }
      });
  };
  const changePw = () => {
    if (memberPw !== "" && memberPw === memberPwRe) {
      axios
        .post(
          "/member/changePw",
          { memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            setIsPwauth(false);
            setCurrPw("");
            setMemberPw("");
            setMemberPwRe("");
            Swal.fire("비밀번호가 변경되었습니다.");
          } else {
            Swal.fire(
              "비밀번호 변경 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
            );
          }
        });
    } else {
      Swal.fire("비밀번호를 확인하세요.");
    }
  };

  const changePwCheck = () => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (!pwReg.test(memberPw)) {
      Swal.fire(
        "최소 8자, 최소 하나의 문자, 특수문자 및 숫자를 포함해야 합니다."
      );
    }
  };

  // 비밀번호 입력 후 엔터 -> 로그인 클릭 함수
  const enterEvent = (e) => {
    if (e.key === "Enter") {
      pwCheck();
    }
  };

  return (
    <div className="modifyPw-wrap">
      <div className="modifyPw-content-wrap">
        <div className="myPage-title">비밀번호 변경</div>
        <div className="modifyPw-content">
          <div className="pw-auth">
            {isPwauth ? (
              <>
                <div className="new-pw-input-wrap">
                  <div className="pw-input-wrap">
                    <div>
                      <label htmlFor="memberPw">새 비밀번호</label>
                      <Input
                        type="password"
                        data={memberPw}
                        setData={setMemberPw}
                        content="memberPw"
                        blurEvent={changePwCheck}
                      />
                    </div>
                    <div>
                      <label htmlFor="memberPw">새 비밀번호 확인</label>
                      <Input
                        type="password"
                        data={memberPwRe}
                        setData={setMemberPwRe}
                        content="memberPwRe"
                      />
                    </div>
                  </div>
                </div>
                <div className="change-btn-box">
                  <Button2 text="비밀번호 변경" clickEvent={changePw} />
                </div>
              </>
            ) : (
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="currPw">현재 비밀번호</label>
                  <Input
                    data={currPw}
                    setData={setCurrPw}
                    type="password"
                    content="currPw"
                    enter={enterEvent}
                  />
                  <Button2 text="입력" clickEvent={pwCheck} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyPw;
