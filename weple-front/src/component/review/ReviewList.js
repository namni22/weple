import { useLocation } from "react-router-dom";
import "./reviewList.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
const ReviewList = () => {
  const location = useLocation();
  const meetNo = location.state.meetNo;
  const [reviewList, setReviewList] = useState([]);
  const [reviewCount,setReviewCount] = useState(0);
  const meetStar = 3.2;
  //리뷰 조회
  useEffect(() => {
    axios
      .get("/review/reviewList/" + meetNo)
      .then((res) => {
        const arr = [...reviewList];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        setReviewList([...arr]);
        setReviewCount(res.data.length);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [meetNo]);
  return (
    <div className="reviewlist-wrap">
      <div className="reviewlist-top">
        <div className="reviewlist-title">후기 {reviewCount}개</div>
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
      </div>
      {reviewList.map((item, index) => {
        return (
          <>
            <ReviewListComponent item={item}/>
          </>
        );
      })}
    </div>
  );
};
const ReviewListComponent = (props) => {
  const reviewStar = 2.7;
  const review = props.item;
  return (
    <div className="reviewlist-component">
      <div className="reviewlist-component-top">
        <div className="review-profile">
          <img
            src="\img\profile_default.png"
            className="review-profile-img"
          ></img>
          <span className="review-name">{review.memberId}</span>
          <div className="star-rating">
            <div
              className="star-rating-fill"
              style={{ width: (review.reviewStar / 5) * 100 + "%" }}
            >
              {starRating()}
            </div>
            <div className="star-rating-base">{starRating()}</div>
          </div>
        </div>
        <span className="material-icons-outlined">more_vert</span>
      </div>
      <div className="review-img">
        <img></img>
        <img></img>
        <img></img>
        <img></img>
        <img></img>
      </div>
      <div className="review-content">{review.reviewContent}</div>
    </div>
  );
};
export default ReviewList;
