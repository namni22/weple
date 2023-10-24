import { useLocation, useNavigate } from "react-router-dom";
import ReviewWriteFrm from "./ReviewWriteFrm";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewModify = (props) => {
  const prev = props.prev;
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state.review;
  const [reviewContent, setReviewContent] = useState(review.reviewContent);
  const [reviewStar, setReviewStar] = useState(review.reviewStar);
  //새로 추가된 애들
  const [rImage, setRImage] = useState([]);
  //DB에서 불러온 파일을 띄우기 위한 배열
  const imgArr = [];
  for (let i = 0; i < review.imageList.length; i++) {
    imgArr.push(<img src={review.imageList[i].rimageName} />);
  }
  const [reviewBox, setReviewBox] = useState(imgArr);
  //삭제파일 state 추가 서버에 보내줌
  const [deleteImg, setDeleteImg] = useState([]);
  const [rimageNoList, setRimageNoList] = useState([]); //DB에서 불러온 이미지배열에서 fimageNo(pk)정보만 담을 state
  const rimageList = review.imageList; //수정 전 이미지 리스트

  //이미지를 db에서 불러오는 작업
  useEffect(() => {
    for (let i = 0; i < rimageList.length; i++) {
      const arr = rimageNoList;
      arr.push(rimageList[i].rimageNo);
      console.log("arr", arr);
      setRimageNoList([...arr]);
    }
  }, []);

  const modify = () => {
    if (reviewContent !== "" && reviewBox.length !== 0) {
      const form = new FormData();
      form.append("reviewContent", reviewContent);
      form.append("reviewStar", reviewStar);
      for (let i = 0; i < rImage.length; i++) {
        form.append("rImage", rImage[i]);
      }
      form.append("reviewNo", review.reviewNo); //수정할 피드 번호
      {
        console.log("deleteImg", deleteImg);
      }
      form.append("deleteImg", deleteImg.join("/")); //삭제할 파일

      const token = window.localStorage.getItem("token");
      axios
        .post("/review/modify", form, {
          headers: {
            contentType: "application/json",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            Swal.fire("성공");
            axios
              .get("/review/reviewInfo" + review.meetNo)
              .then((res) => {
                console.log(res.data);
              })
              .catch((res) => {
                console.log(res);
              });

            navigate("/review", { state: { meetNo: review.meetNo } });
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
        setReviewStar={setReviewStar}
        reviewStar={reviewStar}
        rimageNoList={rimageNoList}
      />
    </div>
  );
};
export default ReviewModify;
