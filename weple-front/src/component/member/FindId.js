import { useState } from "react";
import Input from "../util/InputFrm";
import { Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";

const FindId = () => {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const findId = () => {
    const member = { memberName, memberEmail };
    axios
      .post("member/findId", member)
      .then((res) => {
        if (res.data === "not found") {
          Swal.fire("회원을 조회할 수 없습니다.");
        } else {
          Swal.fire("회원님의 아이디는 " + "'" + res.data + "'입니다.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div className="findId-wrap">
      <div className="findId-title">
        <h3>아이디 찾기</h3>
      </div>
      <div className="findId-content">
        <div className="findId-content-item">
          <label htmlFor="memberName">이름</label>
          <Input
            type="text"
            data={memberName}
            setData={setMemberName}
            content="memberName"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="findId-content-item">
          <label htmlFor="memberEmail">이메일</label>
          <Input
            type="text"
            data={memberEmail}
            setData={setMemberEmail}
            content="memberEmail"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="findId-content-btn">
          <Button2 text="아이디 찾기" clickEvent={findId}></Button2>
        </div>
      </div>
    </div>
  );
};

export default FindId;
