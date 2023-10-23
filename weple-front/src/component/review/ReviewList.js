import { useLocation, useNavigate } from "react-router-dom";
import "./reviewList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Button";
import Swal from "sweetalert2";
import { MoreModal } from "../util/Modal";
//ImageModal
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const starRating = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(
      <span className="material-icons" key={"starRating" + i}>
        grade
      </span>
    );
  }
  return result;
};
const ReviewList = (props) => {
  const [start, setStart] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const meetNo = location.state.meetNo;
  const meetStar = location.state.meetStar;
  const reviewCount = location.state.reviewCount;
  const [reviewList, setReviewList] = useState([]);
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;
  //회원인지 조회
  const [isMember, setIsMember] = useState(false);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post(
        "/member/isMember",
        { meetNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setIsMember(res.data);
      })
      .catch((res) => {
        console.log("isMember", res.status);
      });
  }, []);
  //리뷰 조회
  const amount = 3;
  useEffect(() => {
    const end = start + amount - 1;
    axios
      .get("/review/reviewList/" + meetNo + "/" + start + "/" + end)
      .then((res) => {
        const arr = [...reviewList];
        console.log("res.data review : ", res.data);
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        setReviewList([...arr]);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [start]);

  const useMore = (e) => {
    setStart(start + amount);
  };
  const write = () => {
    navigate("write", { state: { meetNo: meetNo } });
  };
  return (
    <div className="reviewlist-wrap">
      <div className="reviewlist-top">
        <div className="reviewlist-title">후기 {reviewCount}개</div>
        <div className="flex">
          <div className="meet-star-wrap">
            <div className="star-rating meet-star">
              <div
                className="star-rating-fill"
                style={{ width: (meetStar / 5) * 100 + "%" }}
              >
                {starRating()}
              </div>
              <div className="star-rating-base">{starRating()}</div>
            </div>
            <div className="meet-star-score">{meetStar}</div>
          </div>
          {console.log("isMember", isMember)}
          {console.log("isLogin", isLogin)}
          {isMember && isLogin ? (
            <div className="review-write-btn">
              <Button1 text="후기작성" clickEvent={write} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {reviewList.map((item, index) => {
        return (
          <>
            <ReviewListComponent
              item={item}
              isLogin={isLogin}
              isAdmin={isAdmin}
            />
          </>
        );
      })}
      <Button1 clickEvent={useMore} text="더보기" />
    </div>
  );
};
const ReviewListComponent = (props) => {
  const review = props.item;
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const reviewContent = review.reviewContent.replaceAll("<br>", "\r\n");
  /////////////////imagemodal
  const [open, setOpen] = useState(false);
  const handleOpen = (sendImgUrl) => {
    setImgUrl(sendImgUrl);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [imgUrl, setImgUrl] = useState("");

  //더보기 버튼모달
  const moreModal = () => {
    if (isLogin) {
      setIsOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 기능입니다",
        confirmButtonText: "확인",
      });
    }
  };
  //모달 창 닫기
  const onCancel = (e) => {
    setIsOpen(false);
    // e.stopPropagation();
  };
  //삭제버튼 클릭 이벤트
  const deleteEvent = () => {
    Swal.fire({
      icon: "warning",
      text: "리뷰를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      setIsOpen(false);
      if (res.isConfirmed) {
        console.log("isconfirmed" + review.reviewNo);
        axios
          .get("/review/delete/" + review.reviewNo)
          .then((res) => {
            if (res.data !== 0) {
              Swal.fire({
                icon: "success",
                text: "피드가 삭제되었습니다",
                confirmButtonText: "확인",
              }).then((res) => {
                navigate(-1);
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  //수정버튼 클릭 이벤트
  const modifyEvent = () => {
    navigate("/review/modify", { state: { review: review } });
  };

  return (
    <div className="reviewlist-component">
      <div className="reviewlist-component-top">
        <div className="review-profile">
          <div className="review-profile-img">
            {review.memberImage ? (
              <img src={"/member/" + review.memberImage}></img>
            ) : (
              <img src={"../img/testImg_01.png"}></img>
            )}
          </div>
          <div>
            <div className="review-name">{review.memberId}</div>
            <div className="review-date">{review.reviewDate}</div>
          </div>
          <div className="star-rating">
            <div
              className="star-rating-fill"
              style={{ width: (review.reviewStar / 5) * 100 + "%" }}
            >
              {starRating()}
            </div>
            <div className="star-rating-base">{starRating()}</div>
          </div>
        </div>
        <span className="material-icons-outlined" onClick={moreModal}>
          more_vert
        </span>
        <MoreModal
          isOpen={isOpen}
          onCancel={onCancel}
          modifyEvent={modifyEvent}
          isLogin={isLogin}
          feedWriter={review.memberId}
          deleteEvent={deleteEvent}
          isAdmin={isAdmin}
          feedNo={review.reviewNo}
          reportTypeValue={3}
          reportType={3}
        />
      </div>
      <div className="review-img">
        {review.imageList.map((img, index) => {
          return (
            <img
              src={"/review/" + img.rimageName}
              onClick={() => {
                handleOpen(img.rimageName);
              }}
            />
          );
        })}
        <ImageModal
          imgUrl={imgUrl}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      </div>
      <div className="review-content">{reviewContent}</div>
    </div>
  );
};
// 사진모달
const ImageModal = (props) => {
  const imgUrl = props.imgUrl;
  const open = props.open;
  const setOpen = props.setOpen;
  const handleClose = props.handleClose;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // border: "2px solid #000",
    // boxShadow: 24,
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={"/review/" + imgUrl} />
        </Box>
      </Modal>
    </>
  );
};
export default ReviewList;
