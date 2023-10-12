import axios from "axios";
import { MeetItem } from "../meet/MeetList";
import SwiperComponent from "../util/Swiper";
import "./main.css";
import { useEffect, useState } from "react";

import Review from "../review/Review";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FeedContent } from "../feed/FeedList";
import { Button1 } from "../util/Button";
// import "../feed/feed.css";

const Main = () => {
  const imgList = ["./img/main_1.jpg", "./img/main_2.jpg"];
  const list = imgList.map((item, index) => {
    return <img src={item} key={"mainSwiper" + index}></img>;
  });
  return (
    <div className="main-wrap">
      <SwiperComponent
        spaceBetween={21}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        loop={true}
        autoplay={true}
        list={list}
        delButton={false}
      />
      <Review />
      {/* 비로그인 */}
      <MeetMain meetSet={"meetPopular"} meetTitle={"주간 인기 TOP 30 👑"} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"마감임박!"} />
      <MeetMain meetSet={"meetNew"} meetTitle={"신규개설"} />
      {/* 로그인 */}
      {/* <MeetMain meetSet={"meetMargin"} meetTitle={"이 모임은 어때요?"} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"마감임박!"} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"신규개설"} /> */}
    </div>
  );
};

const MeetMain = (props) => {
  const meetSet = props.meetSet;
  const meetTitle = props.meetTitle;
  const [meetMain, setMeetMain] = useState([]);

  useEffect(() => {
    axios
      .get("/meet/" + meetSet)
      .then((res) => {
        setMeetMain(res.data.slice(0, 4));
      })
      .catch((res) => {
        console.log(res.data.status);
      });
  }, []);
  return (
    <div className="meet-main">
      <div className="meet-main-title">
        {meetTitle}
        <Link to="/" className="meet-move-btn">
          전체보기
        </Link>
      </div>
      <div className="meet-one-wrap">
        {meetMain.map((meet, index) => {
          // console.log(meet);
          return <MeetItem key={"meetMain" + index} meet={meet} />;
        })}
      </div>
    </div>
  );
};

const FeedMain = () => {
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const [start, setStart] = useState(1);

  const amount = 9;
  useEffect(() => {
    const end = start + amount - 1;
    axios
      .get("/feed/list/" + start + "/" + end)
      .then((res) => {
        const arr = [...feedList];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        setFeedList([...arr]);
      })
      .catch((res) => {
        Swal.fire("실패");
      });
  }, []);

  return (
    <div>
      <div className="feed-list-content-wrap">
        {feedList.map((feed, index) => {
          return (
            <FeedContent key={"feed" + index} navigate={navigate} feed={feed} />
          );
        })}
      </div>
    </div>
  );
  // const [feedList, setFeedList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/feed/list/" + 1 + "/" + 3)
  //     .then((res) => {
  //       const arr = [...feedList];
  //       console.log(arr[0]);
  //       for (let i = 0; i < res.data.length; i++) {
  //         arr.push(res.data[i]);
  //       }
  //       setFeedList([...arr]);
  //     })
  //     .catch((res) => {
  //       Swal.fire("실패");
  //     });
  // }, []);
  // return (
  //   <div className="feed-main">
  //     <div className="feed-main-title">
  //       피드
  //       <Link to="/feed" className="feed-move-btn">
  //         전체보기
  //       </Link>
  //     </div>
  //     <div className="feed-one-wrap">
  //       {feedList.map((feed, index) => {
  //         return <FeedContent key={"feed" + index} feed={feed} />;
  //       })}
  //     </div>
  //   </div>
  // );
};
export default Main;
