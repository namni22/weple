import { useState } from "react";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";

const FeedWriteFrm = (props) => {
  const feedContent = props.feedContent;
  const setFeedContent = props.setFeedContent;
  const fImage = props.fImage;
  const setFImage = props.setFImage;
  const feedBox = props.feedBox;
  const setFeedBox = props.setFeedBox;
  const uploadEvent = props.uploadEvent;
  const deleteImg = props.deleteImg;
  const setDeleteImg = props.setDeleteImg;

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;
    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      const arr = [...fImage]; //파일객체 더해주기
      const arrBox = [...feedBox]; //화면객체 더해주기

      for (let i = 0; i < Imgs.length; i++) {
        arr.push(Imgs[i]);
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arrBox.push(<img src={reader.result}></img>);
          setFeedBox([...arrBox]);
        };
        setFImage([...arr]);
      }
    } else {
      setFeedBox([]);
      setFImage([]);
    }
  };

  const changeContent = (e) => {
    const changeValue = e.currentTarget.value;
    setFeedContent(changeValue);
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
        {fImage.length === 0 ? (
          <div className="no-image">
            <img />
            <div>NO IMAGE!</div>
          </div>
        ) : (
          <SwiperComponent
            spaceBetween={21}
            slidesPerView={3.5}
            list={feedBox}
            setFeedBox={setFeedBox}
            fImage={fImage}
            setFImage={setFImage}
            loop={false}
            autoplay={false}
            delButton={true}
            deleteImg={deleteImg}
            setDeleteImg={setDeleteImg}
          />
        )}
      </div>
      <textarea onChange={changeContent} defaultValue={feedContent}></textarea>
      <Button2 text="피드 업로드" clickEvent={uploadEvent}></Button2>
    </div>
  );
};

export default FeedWriteFrm;
