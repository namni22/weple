import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
        <div>
          <span className="title">회사소개</span>
          <span>
            위플 주식회사 대표이사 : 이윤수 | 사업자등록번호 : 124-81-00998 |
            사업장주소 : 경기도 수원시 영통구 삼성로 129(매탄동){" "}
          </span>
        </div>
        <div>
          <span className="title">고객센터</span>
          <div className="kakao-chat">
            <span>채팅 상담 :</span>
            <span className="kakao-btn">
              <Link to="http://pf.kakao.com/_xhyxfjG">카카오톡 채널 이동</Link>
            </span>
          </div>
        </div>
        <div>운영시간: 평일/주말 10:00 - 17:00 (점심 : 12:00 - 13:00)</div>
      </div>
    </div>
  );
};
export default Footer;
