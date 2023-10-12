import { useEffect, useState } from "react";
import SwiperComponent from "../util/Swiper";
import "./review.css";
import axios from "axios";

const Review = (props) => {
  // const reviewList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10개의 object
  const [reviewList, setReviewList] = useState([]);
  const meetNo = props.meetNo;

  useEffect(() => {
    // axios.get("/review/reviewTotal/"+meetNo)
    // .then((res)=>{

    // })
    axios
      .get("/review/reviewList/" + meetNo)
      .then((res) => {
        const arr = [...reviewList];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        console.log(res.data.length);
        setReviewList([...arr]);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [meetNo]);
  const list = reviewList.map((item, index) => {
    return (
      <>
        <ReviewComponent review={item} />
      </>
    );
  });
  return (
    <div className="review-wrap">
      <div className="review-top">
        <div className="star-wrap">
          <span className="material-icons star">star</span>
          <span className="material-icons star">star</span>
          <span className="material-icons star">star</span>
          <span className="material-icons star">star</span>
          <span className="material-icons star">star</span>
          <span className="star-rating">5.0</span>
        </div>
        <div className="more-btn">{reviewList.length}개 후기 더보기</div>
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
  );
};

const ReviewComponent = (props) => {
  const reviewContent = props.review.reviewContent;
  const memberId = props.review.memberId;

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
