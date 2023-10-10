import { useState } from "react";
import FeedWriteFrm from "./FeedWriteFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FeedWrite = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState("");
  const [fImage, setFImage] = useState([]);
  const [feedBox, setFeedBox] = useState([]);
  const navigate = props.navigate;

  const write = () => {
    if (feedContent !== "" && fImage.length !== 0) {
      const form = new FormData();
      form.append("feedContent", feedContent);
      for (let i = 0; i < fImage.length; i++) {
        form.append("fImage", fImage[i]);
      }

      axios
        .post("/feed/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire("성공");
            navigate("/feed");
          }
        })
        .catch((res) => {
          Swal.fire("실패");
        });
    } else {
      Swal.fire("이미지 1개이상, 내용 입력 필수입니다");
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
      <FeedWriteFrm
        feedContent={feedContent}
        setFeedContent={setFeedContent}
        fImage={fImage}
        setFImage={setFImage}
        feedBox={feedBox}
        setFeedBox={setFeedBox}
        uploadEvent={write}
      />
    </div>
  );
};

export default FeedWrite;
