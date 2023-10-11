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
  };

  return (
    <div className="myMeetList-all-wrap">
      <div className="myMeetList-btn-wrap">
        <Button1 text={"모임만들기"} clickEvent={create} />
      </div>
      <div>
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
        <div className="meet-one">
          <div className="MeetList-meet-img-box">
            <img src={"/meet/" + myMeet.meetThumbNail}></img>
          </div>
          <div className="MeetList-meetTitle">
            <span>{myMeet.meetTitle}</span>
          </div>
          <div className="">
            <span>인원 : </span>
            <span>{myMeet.meetTotal - myMeet.meetMargin}</span>
            <span>/</span>
            <span>{myMeet.meetTotal}</span>
          </div>
          <div className="MeetList-star">
            <span>별점 </span>
            <span className="material-icons">star_rate</span>
          </div>
          <div className="MeetList-like-box">
            <span className="material-icons MeetList-like">
              favorite_border
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyMeetList;
