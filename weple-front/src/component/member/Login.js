import { useState } from "react";
import "./login.css";
import Input from "../util/InputFrm";
import { Link } from "react-router-dom";
import { Button1, Button2 } from "../util/Button";

const Login = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  return (
    <div className="login-wrap">
      <div className="login-title">
        <h3>로그인</h3>
      </div>
      <div className="login-content">
        <div className="login-input">
          <Input
            type="text"
            data={memberId}
            setData={setMemberId}
            content="memberId"
            placeholder="아이디"
          />
          <Input
            type="password"
            data={memberPw}
            setData={setMemberPw}
            content="memberPw"
            placeholder="비밀번호"
          />
        </div>
        <div className="login-btn-box">
          <Button1 text="로그인" />
        </div>
      </div>
      <div className="login-search-box">
        <ul>
          <li>
            <Link to="#">비밀번호 찾기</Link>
          </li>
          <li>
            <Link to="#">아이디 찾기</Link>
          </li>
        </ul>
      </div>

      <div className="login-join-btn">
        <Link to="/join">
          <Button2 text="회원가입" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
