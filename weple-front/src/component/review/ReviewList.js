import "./reviewList.css";
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
  const meetStar = 3.2;
  return (
    <div className="reviewlist-wrap">
      <div className="reviewlist-title">후기 300개</div>
      <div className="star-rating meet-star">
        <div
          className="star-rating-fill"
          style={{ width: (meetStar / 5) * 100 + "%" }}
        >
          {starRating()}
        </div>
        <div className="star-rating-base">{starRating()}</div>
      </div>
      <ReviewListComponent />
      <ReviewListComponent />
      <ReviewListComponent />
      <ReviewListComponent />
      <ReviewListComponent />
      <ReviewListComponent />
      <ReviewListComponent />
    </div>
  );
};
const ReviewListComponent = () => {
  const reviewStar = 2.7;

  return (
    <div className="reviewlist-component">
      <div className="reviewlist-component-top">
        <div className="review-img">
          <img></img>
          <img></img>
          <img></img>
          <img></img>
          <img></img>
          <img></img>
          <img></img>
        </div>
        <span className="material-icons-outlined">more_vert</span>
      </div>
      <div className="review-content">
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내
        용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내
        용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      </div>
      <div className="review-profile">
        <img
          src="\img\profile_default.png"
          className="review-profile-img"
        ></img>
        <span className="review-name">이름</span>
        <div className="star-rating">
          <div
            className="star-rating-fill"
            style={{ width: (reviewStar / 5) * 100 + "%" }}
          >
            {starRating()}
          </div>
          <div className="star-rating-base">{starRating()}</div>
        </div>
      </div>
    </div>
  );
};
export default ReviewList;
