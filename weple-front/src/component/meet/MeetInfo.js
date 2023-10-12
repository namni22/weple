import { useState } from "react";
import "./afterMeet.css";
import "./meetInfo.css";
import { useEffect } from "react";
import Review from "../review/Review";

const MeetInfo = (props) => {
  const myMeet = props.myMeet;
  return (
    <div className="meetInfo-all-wrap">
      <Review meetNo={102} />
      <div className="meetInfo-content">
        <div className="meetViewContentD-area">
          <div className="meetViewContentD-title">모임소개</div>
          <div
            className="meetViewContentD"
            dangerouslySetInnerHTML={{ __html: myMeet.meetContentD }}
          >
          </div>
        </div>

        <Kakao />
      </div>
    </div>
  );
};

const { kakao } = window;
const Kakao = () => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
};
export default MeetInfo;
