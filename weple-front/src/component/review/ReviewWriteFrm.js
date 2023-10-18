import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";
import "./review.css";
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
const ReviewWriteFrm = (props) => {
  const reviewContent = props.reviewContent;
  const setReviewContent = props.setReviewContent;
  const rImage = props.rImage;
  const setRImage = props.setRImage;
  const reviewBox = props.reviewBox;
  const setReviewBox = props.setReviewBox;
  const uploadEvent = props.uploadEvent;
  const deleteImg = props.deleteImg;
  const setDeleteImg = props.setDeleteImg;
  const rimageNoList = props.rimageNoList;
  console.log(rimageNoList);

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;
    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      const arr = [...rImage]; //파일객체 더해주기
      const arrBox = [...reviewBox]; //화면객체 더해주기

      for (let i = 0; i < Imgs.length; i++) {
        arr.push(Imgs[i]);
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arrBox.push(<img src={reader.result}></img>);
          setReviewBox([...arrBox]);
        };
        setRImage([...arr]);
      }
    } else {
      setReviewBox([]);
      setRImage([]);
    }
  };

  const changeContent = (e) => {
    const changeValue = e.currentTarget.value;
    setReviewContent(changeValue);
  };
  return (
    <div className="review-write-wrap">
      <div className="review-top">
        <div className="profileImg">
          <img src="./img/profile_default.png"></img>
        </div>
        <div className="star-rating">
          {/* <div
            className="star-rating-fill"
            style={{ width: (3 / 5) * 100 + "%" }}
          >
            {starRating()}
          </div> */}
          <div className="star-rating-base">{starRating()}</div>
        </div>
      </div>
      <div className="file-box">
        <label htmlFor="file" className="btn btn1 feed-label">
          사진 첨부하기
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={changeFile}
          multiple
        />
      </div>
      <div className="feed-write-img">
        {reviewBox?.length === 0 ? (
          <div className="no-image">
            <img />
            <div>NO IMAGE!</div>
          </div>
        ) : (
          <SwiperComponent
            spaceBetween={21}
            slidesPerView={3.5}
            list={reviewBox}
            setFeedBox={setReviewBox}
            fImage={rImage}
            setFImage={setRImage}
            loop={false}
            autoplay={false}
            delButton={true}
            deleteImg={deleteImg}
            setDeleteImg={setDeleteImg}
            fimageNoList={rimageNoList}
          />
        )}
      </div>
      <textarea
        onChange={changeContent}
        defaultValue={reviewContent}
      ></textarea>
      <Button2 text={"후기 등록"} clickEvent={uploadEvent} />
    </div>
  );
};
export default ReviewWriteFrm;
