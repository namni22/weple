import axios from "axios";
import { MeetItem } from "../meet/MeetList";
import SwiperComponent from "../util/Swiper";
import "./main.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Main = () => {
  // const imgList = ["./img/main_1.jpg", "./img/main_2.jpg"];
  // const list = imgList.map((item, index) => {
  //   return <img src={item} key={"mainSwiper" + index}></img>;
  // });
  const list = ["./img/main_1.jpg", "./img/main_2.jpg"];
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
      {/* 비로그인 */}
      <MeetMain meetSet={"meetMargin"} meetTitle={"주간 인기 TOP 30 👑"} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"마감임박!"} />
      <MeetMain meetSet={"meetMargin"} meetTitle={"신규개설"} />
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
          return <MeetItem key={"meetMain" + index} meet={meet} />;
        })}
      </div>
    </div>
  );
};
export default Main;
