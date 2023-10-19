import { useLocation, useNavigate } from "react-router-dom";
import "./reviewList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Button";
import Swal from "sweetalert2";
import { MoreModal } from "../util/Modal";

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
  const location = useLocation();
  const navigate = useNavigate();
  const meetNo = location.state.meetNo;
  const meetStar = location.state.meetStar;
  const reviewCount = location.state.reviewCount;
  const [reviewList, setReviewList] = useState([]);
  const [start, setStart] = useState(1);
  const isLogin = props.isLogin;
  //리뷰 조회

  const amount = 10;
  useEffect(() => {
    const end = start + amount - 1;
    axios
      .get("/review/reviewList/" + meetNo + "/" + start + "/" + end)
      .then((res) => {
        const arr = [...reviewList];
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
          <div className="review-write-btn">
            <Button1 text="후기작성" clickEvent={write} />
          </div>
        </div>
      </div>
      {reviewList.map((item, index) => {
        return (
          <>
            <ReviewListComponent item={item} isLogin={isLogin} />
          </>
        );
      })}
      <button defaultValue={1} onClick={useMore}>
        더보기
      </button>
    </div>
  );
};
const ReviewListComponent = (props) => {
  const review = props.item;
  const isLogin = props.isLogin;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const reviewContent = review.reviewContent.replaceAll("<br>", "\r\n");
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
          <img
            src={"/member/" + review.memberImage}
            className="review-profile-img"
          ></img>
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
        />
      </div>
      <div className="review-img">
        {review.imageList.map((img, index) => {
          return <img src={"/review/" + img.rimageName} />;
        })}
      </div>
      <div className="review-content">{reviewContent}</div>
    </div>
  );
};
export default ReviewList;
