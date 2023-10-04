import { Link } from "react-router-dom";
import "./afterMeet.css";

const MyMeetList = () => {
  return (
    <div>
      <div>내가 개설한 모임 리스트 출력하는 페이지</div>
      <div>
        <Link to="afterMeet">리스트 있다가정하고</Link>
      </div>
    </div>
  );
};

export default MyMeetList;
