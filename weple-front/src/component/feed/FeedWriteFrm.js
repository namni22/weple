/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Button2 } from "../util/Button";

const FeedWriteFrm = (props) => {
  const prev = props.prev;
  const [feedImg, setFeedImg] = useState([]);
  const [feedContent, setFeedContent] = useState("");
  const [feedThumb, setFeedThumb] = useState([]);

  const changeFile = (e) => {
    const Imgs = e.currentTarget.files;
    if (Imgs.length !== 0 && Imgs[0] != 0) {
      setFeedImg(Imgs);
      let arr = new Array();

      for (let i = 0; i < Imgs.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(Imgs[i]);
        reader.onload = () => {
          arr.push(reader.result);
          setFeedThumb([...arr]);
        };
      }
    } else {
      setFeedImg([]);
      setFeedThumb([]);
    }
  };

  return (
    <div>
      <div className="feed-title">
        FEED UPLOAD
        <span class="material-icons" onClick={prev}>
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
            <>
              {feedThumb.map((item, index) => {
                return (
                  <div key={"img" + index}>
                    <img src={item} />
                  </div>
                );
              })}
            </>
          )}
        </div>
        <textarea></textarea>
        <Button2 text="파일업로드"></Button2>
      </div>
    </div>
  );
};

export default FeedWriteFrm;
