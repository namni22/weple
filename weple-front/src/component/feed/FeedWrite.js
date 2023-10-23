import { useEffect, useState } from "react";
import FeedWriteFrm from "./FeedWriteFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const FeedWrite = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState("");
  const [fImage, setFImage] = useState([]);
  const [feedBox, setFeedBox] = useState([]);
  const navigate = useNavigate();

  const write = () => {
    if (feedContent !== "" && fImage.length !== 0) {
      const form = new FormData();
      form.append("feedContent", feedContent);
      for (let i = 0; i < fImage.length; i++) {
        form.append("fImage", fImage[i]);
      }

      const token = window.localStorage.getItem("token");
      axios
        .post("/feed/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              text: "피드가 등록되었습니다",
              confirmButtonText: "확인",
            });
            navigate("/feed");
          }
        })
        .catch((res) => {
          console.log("feedwrite" + res.response.status);
          Swal.fire({
            icon: "error",
            title: "문제가 발생했습니다",
            text: "관리자에게 문의하세요",
            confirmButtonText: "확인",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "이미지 1개이상, 내용 입력 필수입니다",
        confirmButtonText: "확인",
      });
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
