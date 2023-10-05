import SwiperComponent from "../util/Swiper";
import "./review.css";

const Review = () => {
  const reviewList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10개의 object
  const list = reviewList.map((item, index) => {
    return (
      <>
        <ReviewComponent />
      </>
    );
  });
  return (
    <div className="review-wrap">
      <div className="star-wrap">
        <span class="material-icons star">star</span>
        <span class="material-icons star">star</span>
        <span class="material-icons star">star</span>
        <span class="material-icons star">star</span>
        <span class="material-icons star">star</span>
        <span className="star-rating">5.0</span>
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

const ReviewComponent = () => {
  return (
    <div className="review-component">
      <div className="review-thumb">
        <img></img>
      </div>
      <div className="review-profile">
        <img src="\img\profile_default.png" className="review-img"></img>
        <span className="review-name">이름</span>
      </div>
      <div className="review-content simple">
        후기내용 후기내용 후기내용 후기내용 후기후기내용 후기내용
        후기내용후기내용 후기내용 후기내용 후기내용후기내용 후기내용 후기내용
        후기내용 후기내용 후기내용 후기내용 후기내용후기내용 후기내용
        후기후기내용 후기내용 후기내용후기내용 후기내용 후기내용
        후기내용후기내용 후기내용 후기내용 후기내용 후기내용 후기내용 후기내용
        후기내용후기내용 후기내용 후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용 후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용 후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용 후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용 후기내용 후기내용 후기내용 후기내용후기내용
        후기내용 후기내용 후기내용후기내용 후기내용 후기내용 후기내용
      </div>
    </div>
  );
};
export default Review;
