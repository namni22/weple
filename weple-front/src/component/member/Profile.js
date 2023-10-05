import { Button1, Button2 } from "../util/Button";
import "./profile.css";
const Profile = () => {
  return (
    <div className="profile-wrap">
      <div className="profile-top">
        <div className="img">
          <img src="img\profile_default.png"></img>
        </div>
        <div className="profile-info">
          <div className="name">이름</div>
          <div className="intro">소개소개 입니다.</div>
        </div>
        <div className="like">36.5 °C</div>
        <div className="prefer">
          <span>음식</span>
          <span>베이킹</span>
        </div>
      </div>
      <div className="profile-mid">
        <Button1 text="피드" clickEvent="/"></Button1>
        <Button2 text="모임" clickEvent="/"></Button2>
      </div>
      <div className="profile-bottom">
        {/* 피드 */}
        {/* 모임 */}
      </div>
    </div>
  );
};
export default Profile;
