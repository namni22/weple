/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button2 } from "../util/Button";
import SwiperComponent from "../util/Swiper";
import { prop } from "dom7";

const FeedWriteFrm = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState(""); //피드내용
  const [feedThumb, setFeedThumb] = useState([]); //서버 전송용 배열
  const [feedImg, setFeedImg] = useState([]); //파일객체 저장용 배열
  const [feedBox, setFeedBox] = useState([]); //화면 구현용 배열
  const [delImgNo, setDelImgNo] = useState([]); //파일삭제용
  const imgArr = new Array(); //전송객체 더해주길

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
          arrBox.push(
            <ImgBox
              src={reader.result}
              feedBox={feedBox}
              setFeedBox={setFeedBox}
              feedThumb={feedThumb}
              setFeedThumb={setFeedThumb}
            />
          );
          setFeedBox([...arrBox]);
          // imgArr.push(reader.result);
          // setFeedThumb([...imgArr]);
          // console.log(arr);
          // console.log(feedBox);
          // console.log(imgArr);
          // console.log(feedThumb);
        };
        console.log(111);
        console.log(arrBox);
        console.log(arr);
        setFeedThumb([...arr]);
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
  const arrBox = props.arrBox;
  const feedBox = props.feedBox;
  const setFeedBox = props.setFeedBox;
  const feedThumb = props.feedThumb;
  const setFeedThumb = props.setFeedThumb;
  const i = props.i;
  console.log(feedBox);
  console.log(feedThumb);
  // const delImgNo = props.delImgNo;
  // const setDelImgNo = props.setDelImgNo;

  const deleteImg = () => {
    console.log(feedBox);
    console.log(feedThumb);
    feedBox.splice(i, 1);
    setFeedBox([...arrBox]);
    feedThumb.splice(i, 1);
    setFeedThumb([...feedThumb]);
  };

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
