import { useLocation } from "react-router-dom";
import { MeetItem } from "../meet/MeetList";

// import "./meetList.css";
const MainMeet = () => {
  const location = useLocation();
  const meetList = location.state.meetList;
  const meetTitle = location.state.meetTitle;
  const isLogin = location.state.isLogin;
  console.log("메인미트 : ", meetList);
  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">
        <div className="bigCategoryName">{meetTitle}</div>
        <div>
          <ul className="smallCategory-ul">
            <li></li>
          </ul>
        </div>
      </div>
      <div className="meetList-area">
        {meetList.map((meet, index) => {
          return <MeetItem key={"meet" + index} meet={meet} isLogin={isLogin} />;
        })}
      </div>
    </div>
  );
};

export default MainMeet;
