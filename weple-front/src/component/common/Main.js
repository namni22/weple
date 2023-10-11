import axios from "axios";
import { MeetItem, MeetList } from "../meet/MeetList";
import SwiperComponent from "../util/Swiper";
import "./main.css";
import { useEffect, useState } from "react";
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
      <MeetMain meetSet={"meetMargin"} />
    </div>
  );
};

const MeetMain = (props) => {
  const meetSet = props.meetSet;
  const [meetMain, setMeetMain] = useState([]);

  useEffect(() => {
    axios
      .get("/meet/" + meetSet)
      .then((res) => {
        console.log(res.data);
        setMeetMain(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <div className="MeetMain">
      <div>모임 카테고리</div>
      {meetMain.map((meet, index) => {
        return <MeetItem key={"meet" + index} meet={meet} />;
      })}
    </div>
  );
};
export default Main;
