import { Link, useNavigate } from "react-router-dom";
import "./afterMeet.css";
import { Button1 } from "../util/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
//게시물 목록
const MyMeetList = () => {
  const [myMeetList, setMyMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/meet/myMeetList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setMyMeetList(res.data.myMeetList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  const navigate = useNavigate();
  const create = () => {
    navigate("../meetCreate");
  }

  return (
    <div>
      <div>내가 개설한 모임 리스트 출력하는 페이지</div>
      <div>
        <Button1 text={"모임만들기"} clickEvent={create} />
      </div>
      <div>
        {/*
        <Link to="afterMeet">리스트 있다가정하고</Link>
         */}
        {myMeetList.map((myMeet, index) => {
          return <MyMeetItem key={"myMeet" + index} myMeet={myMeet} />;
        })}
      </div>
      <div>
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const MyMeetItem = (props) => {
  const myMeet = props.myMeet;
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          navigate("afterMeet", { state: { mm: myMeet } });
        }}
      >
        {myMeet.meetTitle}
        {/*
        <Link to="afterMeet">{myMeet.meetTitle}</Link>
        */}
      </div>
    </div>
  );
};
export default MyMeetList;
