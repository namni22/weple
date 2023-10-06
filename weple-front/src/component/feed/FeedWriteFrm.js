/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";
import { prop } from "dom7";

const FeedWriteFrm = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState(""); //피드내용
  const [feedThumb, setFeedThumb] = useState([]); //서버 전송용 배열
  const [feedBox, setFeedBox] = useState([]); //화면 구현용 배열

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;
    console.log(Imgs);

    if (Imgs.length !== 0 && Imgs[0] !== 0) {
      const arr = [...feedThumb]; //파일객체 더해주기
      const arrBox = [...feedBox]; //화면객체 더해주기

      for (let i = 0; i < Imgs.length; i++) {
        arr.push(Imgs[i]);
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arrBox.push(reader.result);
          setFeedBox([...arrBox]);
        };
        setFeedThumb([...arr]);
      }
    } else {
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
              setFeedBox={setFeedBox}
              feedThumb={feedThumb}
              setFeedThumb={setFeedThumb}
              loop={false}
              autoplay={false}
              delButton={true}
            />
          )}
        </div>
        <textarea></textarea>
        <Button2 text="파일업로드"></Button2>
      </div>
    </div>
  );
};

export default FeedWriteFrm;
