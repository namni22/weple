/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";
import { prop } from "dom7";

const FeedWriteFrm = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState("");
  const [feedThumb, setFeedThumb] = useState([]);
  const [feedImg, setFeedImg] = useState([]);
  const [feedBox, setFeedBox] = useState([]);
  const [delImgNo, setDelImgNo] = useState([]);

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;

    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      setFeedImg(Imgs);
      const arr = new Array();
      const imgArr = new Array();

      for (let i = 0; i < Imgs.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arr.push(
            <ImgBox
              src={reader.result}
              feedBox={feedBox}
              setFeedBox={setFeedBox}
              i={i}
            />
          );
          setFeedBox([...arr]);
          imgArr.push(reader.result);
          setFeedThumb([...imgArr]);
        };
      }
    } else {
      setFeedImg([]);
      setFeedBox([]);
      setFeedThumb([]);
    }
  };

  return (
    <div>
      <div className="feed-title">
        FEED UPLOAD
        <span className="material-icons" onClick={prev}>
          close
        </span>
      </div>
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
          {feedThumb.length === 0 ? (
            <div>
              <img />
            </div>
          ) : (
            <SwiperComponent
              spaceBetween={21}
              slidesPerView={3.5}
              list={feedBox}
              loop={false}
              autoplay={false}
            />
          )}
        </div>
        <textarea></textarea>
        <Button2 text="파일업로드"></Button2>
      </div>
    </div>
  );
};

const ImgBox = (props) => {
  const src = props.src;
  const feedBox = props.feedBox;
  const setFeedBox = props.setFeedBox;
  const i = props.i;

  const deleteImg = () => {};

  return (
    <div className="feed-write-img-box">
      <img src={src}></img>
      <button onClick={deleteImg}>
        <span className="material-icons">close</span>
      </button>
    </div>
  );
};

export default FeedWriteFrm;
