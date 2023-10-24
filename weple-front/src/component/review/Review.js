import { useEffect, useState } from "react";
import SwiperComponent from "../util/Swiper";
import "./review.css";
import "./reviewList.css";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button1 } from "../util/Button";

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
  const [isMember, setIsMember] = useState(false);
  const meetNo = props.meetNo;
  const meetStar = props.reviewStar;
  const reviewCount = props.reviewCount;
  //리뷰 작성
  const navigate = useNavigate();
  const write = () => {
    navigate("/review/write", { state: { meetNo: meetNo } });
  };
  //리뷰 조회
  useEffect(() => {
    // //isMember
    const token = window.localStorage.getItem("token");
    axios
      .post(
        "/member/isMember",
        { meetNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setIsMember(res.data);
      })
      .catch((res) => {
        console.log("isMember", res.status);
      });
    //select ReviewList
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
        setReviewList([...arr]);
      })
      .catch((res) => {
        console.log(res.data?.status);
      });
  }, [meetNo]);
  //리뷰 => 컴포넌트 배열로 바꿔줌
  const list = reviewList.map((item, index) => {
    return (
      <Link
        to="/review"
        state={{
          meetNo: meetNo,
          meetStar: meetStar,
          reviewCount: reviewCount,
        }}
      >
        <ReviewComponent review={item} />
      </Link>
    );
  });
  return (
    <>
      {/* 리뷰가 있으면 보임 */}
      {reviewCount < 1 ? (
        <div className="review-all-wrap">
          <div className="meetInfo-content-title">모임리뷰</div>
          {
            <div className="review-wrap">
              {isMember ? (
                <div className="">
                  이미 회원이신가요? 첫번째 리뷰를 작성해 보세요!
                  <div className="review-write-btn">
                    <Button1 text="후기작성" clickEvent={write} />
                  </div>
                </div>
              ) : (
                <span className="review-none">
                  모임에 가입하고 첫 번째 리뷰를 작성해 보세요😘
                </span>
              )}
            </div>
          }
        </div>
      ) : (
        <div className="review-all-wrap">
          <div className="meetInfo-content-title">모임리뷰</div>
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
        </div>
      )}
    </>
  );
};
const ReviewComponent = (props) => {
  // 옵셔널 : props가 존재하지 않을 경우 null이나 undefined를 리턴함
  const reviewContent = props.review?.reviewContent.replaceAll("<br>", "\r\n");
  const memberId = props.review?.memberId;
  const rimageName = "/review/" + props.review?.rimageName;
  const memberImage = props.review?.memberImage;
  // console.log("리뷰에서~" + props.review);
  // console.log(props.review);
  return (
    <div className="review-component">
      <div className="review-thumb">
        <img src={rimageName}></img>
      </div>
      <div className="review-profile">
        {memberImage ? (
          <img src={"/member/" + memberImage} className="review-img" />
        ) : (
          <img src={"../img/testImg_01.png"} className="review-img" />
        )}
        <span className="review-name">{memberId}</span>
      </div>
      <div className="review-content simple">{reviewContent}</div>
    </div>
  );
};
export default Review;
