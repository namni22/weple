import { useEffect, useState } from "react";
import "./meetList.css";
import axios from "axios";

const MeetList = () => {

  //로그인상태 불러올곳 ( 모임생성버튼이 이곳에 있다면 버튼을 위해서 )
  //const isLogin = props.isLogin;

  const [meetList, setMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //처음에는 1페이지
  const [pagenfo, setPageInfo] = useState({});

  useEffect(() => {
    axios
      .get("/meet/meetList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setMeetList(res.data.meetList);
        //페이지인포 셋팅
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  }, []);


  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">카테고리</div>
      <div className="meetList-area">
        {/* meetList db에서 받아온후 map으로 반복출력 예정 */}
        {/* props로 meet 정보 줄예정 */}
        {meetList.map((meet, index) => {
          return <MeetItem key={"meet" + index} meet={meet} />
        })}

      </div>
    </div>
  );
};

const MeetItem = (props) => {
  // 연주님께~  meet props로 전달해주시고 meetList 따로 select 해와서 map으로 반복 출력해주세요
  const meet = props.meet;

  console.log(meet.meetThumbNail);

  return (
    <div className="meet-one">

      <div className="MeetList-meet-img-box">
        {/* <img src="/img/main_1.jpg"></img> */}
        <img src={meet.meetThumbNail}></img>
      </div>
      <div className="MeetList-meetTitle">
        <span>{meet.meetTitle}</span>
      </div>
      <div className="">
        <span>인원 : </span>
        <span>{meet.meetTotal - meet.meetMargin}</span>
        <span>/</span>
        <span>{meet.meetTotal}</span>
      </div>
      <div className="MeetList-star">
        <span>별점 </span>
        <span className="material-icons">star_rate</span>
      </div>
      <div className="MeetList-like-box">
        <span className="material-icons MeetList-like">favorite_border</span>
      </div>
    </div>
  );
}

export { MeetList, MeetItem };
