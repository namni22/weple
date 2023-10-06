import "./meetComponent.css";

const MeetComponent = () => {
  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">카테고리</div>
      <div className="meetList-area">
        <div className="meet-one">
          <div className="MeetList-meet-img-box">
            <img src="/img/main_1.jpg"></img>
          </div>
          <div className="MeetList-meetTitle">
            <span>제목</span>
          </div>

          <div>
            <span>인원 : </span>
            <span>db</span>
          </div>
          <div className="MeetList-star">
            <span>별점 </span>
            <span className="material-icons">star_rate</span>
          </div>
          <div className="MeetList-like-box">
            <span className="material-icons MeetList-like">favorite_border</span>
          </div>
        </div>
        {/* < */}

        {/* > */}
      </div>
    </div>
  );
};

export default MeetComponent;
