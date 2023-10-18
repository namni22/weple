import { useState } from "react";
import Input from "../util/InputFrm";
import { Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FindPw = () => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const member = { memberId, memberName, memberEmail, memberPw };

  // 입력한 정보 조회해서 회원 존재 시 랜덤 문자열 메일링
  const findPw = () => {
    axios
      .post("member/findPw", member)
      .then((res) => {
        if (res.data === "password") {
          axios
            .post("member/sendMail", member)
            .then((res) => {
              setMemberPw(res.data);
              Swal.fire("임시 비밀번호를 메일로 발송했습니다.");
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        } else if (res.data === "not found") {
          Swal.fire("회원정보를 찾을 수 없습니다.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  // 메일로 받은 랜덤 문자열을 해당 계정 비밀번호로 바꿔주는 작업
  axios
    .post("member/changeTemporaryPw", member)
    .then((res) => {
      console.log(res.data);
      navigate("/login");
    })
    .catch((res) => {
      console.log(res.response.status);
    });

  return (
    <div className="findPw-wrap">
      <div className="findPw-title">
        <h3>비밀번호 찾기</h3>
      </div>
      <div className="findPw-content">
        <div className="findPw-content-item">
          <label htmlFor="memberId">아이디</label>
          <Input
            type="text"
            data={memberId}
            setData={setMemberId}
            content="memberId"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="findPw-content-item">
          <label htmlFor="memberName">이름</label>
          <Input
            type="text"
            data={memberName}
            setData={setMemberName}
            content="memberName"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="findPw-content-item">
          <label htmlFor="memberEmail">이메일</label>
          <Input
            type="text"
            data={memberEmail}
            setData={setMemberEmail}
            content="memberEmail"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="findPw-content-btn">
          <Button2 text="비밀번호 찾기" clickEvent={findPw}></Button2>
        </div>
      </div>
    </div>
  );
};

export default FindPw;
