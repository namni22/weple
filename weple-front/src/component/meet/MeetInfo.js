import { useState } from "react";
import "./afterMeet.css";
import { useEffect } from "react";
import Review from "../review/Review";

const MeetInfo = () => {
  //임시 리뷰 배열 데이터
  const [reviewList, setReviewList] = useState([
    {
      img: "/img/testImg_01.png",
      userImg: "/img/testImg_01.png",
      userId: "닉네임1",
      content: "리뷰내용...1",
    },
    {
      img: "/img/testImg_01.png",
      userImg: "/img/testImg_01.png",
      userId: "닉네임2",
      content: "리뷰내용...2",
    },
    {
      img: "/img/testImg_01.png",
      userImg: "/img/testImg_01.png",
      userId: "닉네임3",
      content: "리뷰내용...3",
    },
    {
      img: "/img/testImg_01.png",
      userImg: "/img/testImg_01.png",
      userId: "닉네임4",
      content: "리뷰내용...4",
    },
  ]);
  return (
    <div className="meetInfo-all-wrap">
      <Review />
      <div className="meetInfo-content">
        모임소개.input 폼에서 불러오기
        <Kakao />
      </div>
    </div>
  );
};

const ReviewList = (props) => {
  const review = props.review;
  return (
    <div className="meetInfo-reviewList-wrap">
      <div className="meetInfo-reviewList-img">
        <img src={review.img} />
      </div>
      <div className="meetInfo-reviewList-member">
        <div className="meetInfo-reviewList-member-img">
          <img src={review.userImg} />
        </div>
        <div className="meetInfo-reviewList-member-id">{review.userId}</div>
      </div>
      <div className="meetInfo-reviewList-content">{review.content}</div>
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
