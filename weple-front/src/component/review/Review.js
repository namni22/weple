import { useEffect, useState } from "react";
import SwiperComponent from "../util/Swiper";
import "./review.css";
import "./reviewList.css";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import ReviewWrite from "./ReviewWrite";
const starRating = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(
      <span className="material-icons" key={"starRating" + i}>
        grade
      </span>
    );
  }
  return result;
};
const Review = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const meetNo = props.meetNo;
  const meetStar = props.reviewStar;
  const reviewCount = props.reviewCount;
  const isMeetMember = props.isMeetMember; //해당 멤버인지 확인하는 함수(undefined)
  console.log("isMeetMember: " + isMeetMember);
  //리뷰 조회
  useEffect(() => {
    axios
      .get("/review/previewList/" + meetNo)
      .then((res) => {
        const arr = [...reviewList];
        if (res.data.length < 11) {
          for (let i = 0; i < res.data.length; i++) {
            arr.push(res.data[i]);
          }
        } else {
          for (let i = 0; i < 10; i++) {
            arr.push(res.data[i]);
          }
        }
        console.log(res.data.length);
        setReviewList([...arr]);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [meetNo]);
  //리뷰 => 컴포넌트 배열로 바꿔줌
  const list = reviewList.map((item, index) => {
    return (
      <>
        <ReviewComponent review={item} />
      </>
    );
  });
  return (
    <>
      {/* 리뷰가 있으면 보임 */}
      {reviewCount < 1 ? (
        <></>
      ) : (
        <div className="review-wrap">
          <div className="review-top">
            <div className="meet-star-wrap">
              <div className="star-rating meet-star">
                <div
                  className="star-rating-fill"
                  style={{ width: (meetStar / 5) * 100 + "%" }}
                >
                  {starRating()}
                </div>
                <div className="star-rating-base">{starRating()}</div>
              </div>
              <div className="meet-star-score">{meetStar}</div>
            </div>
            <Link
              to="/review"
              state={{
                meetNo: meetNo,
                meetStar: meetStar,
                reviewCount: reviewCount,
              }}
            >
              <div className="more-btn">{reviewCount}개 후기 더보기</div>
            </Link>
          </div>
          <SwiperComponent
            spaceBetween={21}
            slidesPerView={4.7}
            navigation={true}
            loop={false}
            autoplay={false}
            list={list}
          />
        </div>
      )}
    </>
  );
};
const ReviewComponent = (props) => {
  // 옵셔널 : props가 존재하지 않을 경우 null이나 undefined를 리턴함
  const reviewContent = props.review?.reviewContent;
  const memberId = props.review?.memberId;

  return (
    <div className="review-component">
      <div className="review-thumb">
        <img></img>
      </div>
      <div className="review-profile">
        <img src="\img\profile_default.png" className="review-img"></img>
        <span className="review-name">{memberId}</span>
      </div>
      <div className="review-content simple">{reviewContent}</div>
    </div>
  );
};
export default Review;
