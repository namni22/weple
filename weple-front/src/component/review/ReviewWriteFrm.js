import "./review.css";
const ReviewWriteFrm = ()=>{
    return (
      <div className="review-write-wrap">
        <div className="review-top">
          <div className="profileImg">
            <img src="./img/profile_default.png"></img>
          </div>
          <div className="review-star">
            <span class="material-icons">star</span>
            <span class="material-icons">star_half</span>
            <span class="material-icons">star_border</span>
            <span class="material-icons">star_border</span>
            <span class="material-icons">star_border</span>
          </div>
        </div>
        <textarea
          className="review-write"
          placeholder="내용을 입력하세요."
        ></textarea>
        <div className="review-bottom">
          <img className="reviewImg"></img>
          <img className="reviewImg"></img>
          <span class="material-icons plus">add</span>
        </div>
        <button>등록하기</button>
      </div>
    );
}
export default ReviewWriteFrm;