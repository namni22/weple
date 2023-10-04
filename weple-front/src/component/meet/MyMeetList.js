import { Link } from "react-router-dom";
import "./afterMeet.css";
import { Button1 } from "../util/Button";
import { useState } from "react";
import axios from "axios";
//게시물 목록
const MyMeetList = () => {
  const [myMeetList, setMyMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  axios
    .get("/meet/myMeetList" + reqPage)
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log(res.response.status);
    });
  return (
    <div>
      <div>내가 개설한 모임 리스트 출력하는 페이지</div>
      <div>
        <Button1 text={"모임만들기"} />
      </div>
      <div>
        <Link to="afterMeet">리스트 있다가정하고</Link>
      </div>
    </div>
  );
};

export default MyMeetList;
