import { useLocation, useNavigate } from "react-router-dom";
import ReviewWriteFrm from "./ReviewWriteFrm";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewModify = (props) => {
  const prev = props.prev;
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state.review;
  const [reviewContent, setReviewContent] = useState(review.reviewContent);
  const [reviewStar, setReviewStar] = useState(review.reviewStar);
  const [rImage, setRImage] = useState([]);
  //DB에서 불러온 파일을 띄우기 위한 배열
  const imgArr = [];
  for (let i = 0; i < review.imageList.length; i++) {
    imgArr.push(<img src={review.imageList[i].rimageName} />);
  }
  const [reviewBox, setReviewBox] = useState(imgArr);
  const [deleteImg, setDeleteImg] = useState([]); //삭제파일 state 추가
  const rimageNoList = review.imageList;

  const modify = () => {
    if (reviewContent !== "" && reviewBox.length !== 0) {
      const form = new FormData();
      form.append("reviewContent", reviewContent);
      form.append("reviewStar", reviewStar);
      for (let i = 0; i < rImage.length; i++) {
        form.append("rImage", rImage[i]);
      }
      form.append("reviewNo", review.reviewNo); //수정할 피드 번호
      form.append("deleteImg", deleteImg.join("/")); //삭제할 파일

      const token = window.localStorage.getItem("token");
      axios
        .post("/review/modify", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            Swal.fire("성공");
            navigate(-1);
          }
        })
        .catch((res) => {
          console.log("reviewmodify" + res.response.status);
          Swal.fire("실패");
        });
    } else {
      Swal.fire("이미지 1개이상, 내용 입력 필수입니다");
    }
  };

  return (
    <div>
      <div className="feed-title">
        REVIEW MODIFY
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
        uploadEvent={modify}
        deleteImg={deleteImg}
        setDeleteImg={setDeleteImg}
        type="modify"
        const
        rimageNoList={rimageNoList}
      />
    </div>
  );
};
export default ReviewModify;
