import Swal from "sweetalert2";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";
import "./review.css";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";

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
  const setReviewStar = props.setReviewStar;
  const reviewStar = props.reviewStar;
  const type = props.type;

  //이미지파일변경
  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;
    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      const arr = [...rImage]; //파일객체 더해주기
      const arrBox = [...reviewBox]; //화면객체 더해주기
      if (Imgs.length > 10 || Imgs.length + arr.length > 10) {
        Swal.fire({
          icon: "error",
          text: "최대 10장까지 업로드 가능합니다",
          confirmButtonText: "확인",
        });
      } else {
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
      }
    } else {
      setReviewBox([]);
      setRImage([]);
    }
    e.currentTarget.value = null;
  };

  const changeContent = (e) => {
    const changeValue = e.currentTarget.value;
    const changeEnter = changeValue.replace(/(?:\r\n|\r|\n)/g, "<br>");
    const changeSpace = changeEnter.replace(/\s{2,}/gi, " ");
    setReviewContent(changeSpace);
    if (changeSpace === " ") {
      setReviewContent(reviewContent.replace(/\s/gi, ""));
    }
  };
  return (
    <div className="review-write-wrap">
      <div className="review-top">
        <div className="profileImg">
          <img src="./img/profile_default.png"></img>
        </div>
        <div className="star-rating">
          <Rating
            name="half-rating"
            defaultValue={5}
            precision={0.5}
            value={reviewStar}
            onChange={(event, newValue) => {
              setReviewStar(newValue);
              // console.log(value);?
            }}
          />
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
            type={type}
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
