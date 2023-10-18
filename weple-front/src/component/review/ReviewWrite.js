import { useLocation, useNavigate } from "react-router-dom";
import ReviewWriteFrm from "./ReviewWriteFrm";
import "./review.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const ReviewWrite = (props) => {
  const prev = props.prev;
  const [reviewContent, setReviewContent] = useState("");
  const [rImage, setRImage] = useState([]);
  const [reviewBox, setReviewBox] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const meetNo = location.state.meetNo;
  const [reviewStar, setReviewStar] = useState(0.5);
  const write = () => {
    if (reviewContent !== "" && rImage.length !== 0) {
      const form = new FormData();
      form.append("reviewContent", reviewContent);
      form.append("meetNo", meetNo);
      form.append("reviewStar", reviewStar);
      for (let i = 0; i < rImage.length; i++) {
        form.append("rImage", rImage[i]);
      }

      const token = window.localStorage.getItem("token");
      axios
        .post("/review/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire("성공");
            prev();
          }
        })
        .catch((res) => {
          console.log("reviewrite" + res.response.status);
          Swal.fire("실패");
        });
    } else {
      Swal.fire("이미지 1개이상, 내용 입력 필수입니다");
    }
  };
  return (
    <div>
      <div className="review-title">
        REVIEW UPLOAD
        <span className="material-icons" onClick={prev}>
          close
        </span>
      </div>
      <ReviewWriteFrm
        reviewContent={reviewContent}
        setReviewContent={setReviewContent}
        rImage={rImage}
        setRImage={setRImage}
        reviewBox={reviewBox}
        setReviewBox={setReviewBox}
        uploadEvent={write}
      />
    </div>
  );
};
export default ReviewWrite;
