import { useState } from "react";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";

const FeedWriteFrm = (props) => {
  const feedContent = props.feedContent;
  const setFeedContent = props.setFeedContent;
  const feedImage = props.feedImage;
  const setFeedImage = props.setFeedImage;
  const feedBox = props.feedBox;
  const setFeedBox = props.setFeedBox;
  const uploadEvent = props.uploadEvent;

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;

    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      const arr = [...feedImage]; //파일객체 더해주기
      const arrBox = [...feedBox]; //화면객체 더해주기

      for (let i = 0; i < Imgs.length; i++) {
        arr.push(Imgs[i]);
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arrBox.push(reader.result);
          setFeedBox([...arrBox]);
        };
        setFeedImage([...arr]);
      }
    } else {
      setFeedBox([]);
      setFeedImage([]);
    }
  };

  return (
    <div className="feed-write-wrap">
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
        {feedImage.length === 0 ? (
          <div>
            <img />
          </div>
        ) : (
          <SwiperComponent
            spaceBetween={21}
            slidesPerView={3.5}
            list={feedBox}
            setFeedBox={setFeedBox}
            feedImage={feedImage}
            setFeedImage={setFeedImage}
            loop={false}
            autoplay={false}
            delButton={true}
          />
        )}
      </div>
      <textarea></textarea>
      <Button2 text="피드 업로드" onclick={uploadEvent}></Button2>
    </div>
  );
};

export default FeedWriteFrm;
