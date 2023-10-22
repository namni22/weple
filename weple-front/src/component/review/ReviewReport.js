import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button1 } from "../util/Button";
import { FeedViewContent } from "../feed/FeedView";
import Swal from "sweetalert2";
import { MoreModal } from "../util/Modal";

const ReviewReport = (props)=>{
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
      width: "520px",
      overflow: "inherit",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const reviewOpen = props.reviewOpen;
  const closeView = props.closeView;
  const reviewNo = props.reviewNo;
  const isAdmin = props.isAdmin;
  const [review, setReview] = useState({});
  const [reviewBox, setReviewBox] = useState([]);   
  const [delModal, setDelModal] = useState(false);  //삭제버튼
  //review
  useEffect(() => {
    axios
      .get("/review/one/" + reviewNo)
      .then((res) => {
        setReview(res.data);
        console.log("imageList", res.data.imageList);
        const imgArr = [];
        for (let i = 0; i < res.data.imageList.length; i++) {
          imgArr.push(
            <img src={"/review/" + res.data.imageList[i]?.rimageName} />
          );
        }
        setReviewBox(imgArr);
      })
      .catch((res) => {
        console.log("잘 되는지?", res.data);
        console.log(res.response.status);
        // Swal.fire("실패");
      });
  }, [reviewNo]);
  //삭제 이벤트
const deleteEvent = () => {
  Swal.fire({
    icon: "warning",
    text: "리뷰를 삭제하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then((res) => {
    setDelModal(false);
    closeView();
    if (res.isConfirmed) {
      axios
        .get("/review/delete/" + reviewNo)
        .then((res) => {
          if (res.data !== 0) {
            Swal.fire({
              icon: "success",
              text: "리뷰가 삭제되었습니다",
              confirmButtonText: "확인",
            })
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  });
};
  return (
    <ReactModal style={customStyles} isOpen={reviewOpen}>
      <MoreModal
        isOpen={delModal}
        deleteEvent={deleteEvent}
        isAdmin={isAdmin}
        feedNo={review.reviewNo}
      />
      <div className="feed-view">
        <div className="feed-view-top">
          <div className="feed-list-more-btn" onClick={()=>{
            setDelModal(true);
          }}>
            <span className="material-icons-outlined">more_vert</span>
          </div>
          <div className="feed-list-top">
            <div className="feed-list-profile">
              {review.memberImage ? (
                <img src={"/member/" + review.memberImage} />
              ) : (
                <img src="/img/testImg_01.png" />
              )}
            </div>
            <div className="feed-list-info">
              <div>{review.memberId}</div>
              <div>{review.reviewDate}</div>
            </div>
          </div>
        </div>
        <FeedViewContent
          feedContent={review.reviewContent}
          feedBox={reviewBox}
          closeView={closeView}
        />
        <Button1 text="닫기" clickEvent={closeView} />
      </div>
    </ReactModal>
  );
}
export default ReviewReport;