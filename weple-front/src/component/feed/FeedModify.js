import { useEffect, useState } from "react";
import FeedWriteFrm from "./FeedWriteFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const FeedModify = (props) => {
  const prev = props.prev;
  const navigate = useNavigate();
  const location = useLocation();
  const feed = location.state.feed;
  const [feedContent, setFeedContent] = useState(feed.feedContent);
  const [fImage, setFImage] = useState([]);
  //DB에서 불러온 파일을 띄우기 위한 배열
  const imgArr = [];
  for (let i = 0; i < feed.imageList.length; i++) {
    imgArr.push(<img src={feed.imageList[i]?.fimageName} />);
  }
  const [feedBox, setFeedBox] = useState(imgArr);
  const [deleteImg, setDeleteImg] = useState([]); //삭제파일 state 추가
  const fimageNoList = feed.imageList;

  const modify = () => {
    if (feedContent !== "" && feedBox.length !== 0) {
      const form = new FormData();
      form.append("feedContent", feedContent);
      for (let i = 0; i < fImage.length; i++) {
        form.append("fImage", fImage[i]);
      }
      form.append("feedNo", feed.feedNo); //수정할 피드 번호
      form.append("deleteImg", deleteImg.join("/")); //삭제할 파일

      const token = window.localStorage.getItem("token");
      axios
        .post("/feed/modify", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            Swal.fire("성공");
            navigate("/feed");
          }
        })
        .catch((res) => {
          console.log("feedmodify" + res.response.status);
          Swal.fire("실패");
        });
    } else {
      Swal.fire("이미지 1개이상, 내용 입력 필수입니다");
    }
  };

  return (
    <div>
      <div className="feed-title">
        FEED MODIFY
        <span className="material-icons" onClick={prev}>
          close
        </span>
      </div>
      <FeedWriteFrm
        feedContent={feedContent}
        setFeedContent={setFeedContent}
        fImage={fImage}
        setFImage={setFImage}
        feedBox={feedBox}
        setFeedBox={setFeedBox}
        uploadEvent={modify}
        deleteImg={deleteImg}
        setDeleteImg={setDeleteImg}
        type="modify"
        fimageNoList={fimageNoList}
      />
    </div>
  );
};

export default FeedModify;
