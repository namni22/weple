import { useState } from "react";
import Input from "../util/InputFrm";
import { Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";

const FindPw = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPw, setMemberPw] = useState("");

  const findPw = () => {
    const member = { memberId, memberName, memberEmail, memberPw };
    axios
      .post("member/findPw", member)
      .then((res) => {
        if (res.data === "password") {
          axios
            .post("member/sendMail", member)
            .then((res) => {
              console.log(res.data);
              setMemberPw(res.data);
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
