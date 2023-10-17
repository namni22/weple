import { useState } from "react";
import Input from "../util/InputFrm";
import { Button2 } from "../util/Button";

const FindId = () => {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

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
          <Button2 text="아이디 찾기"></Button2>
        </div>
      </div>
    </div>
  );
};

export default FindId;
