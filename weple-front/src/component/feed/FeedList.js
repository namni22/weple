import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SwiperComponent from "../util/Swiper";
import { MoreModal } from "../util/Modal";
import FeedComment from "./FeedComment";

const FeedList = (props) => {
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const [start, setStart] = useState(1);
  const isLogin = props.isLogin;
  const id = props.id;

  const amount = 9;
  useEffect(() => {
    const end = start + amount - 1;
    axios
      .get("/feed/list/" + start + "/" + end)
      .then((res) => {
        const arr = [...feedList];
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }
        setFeedList([...arr]);
      })
      .catch((res) => {
        Swal.fire("실패");
      });
  }, [start]);

  const useFeedMore = (e) => {
    setStart(start + amount);
  };

  const write = () => {
    navigate("/feed/write");
  };

  return (
    <div>
      <div className="feed-title">WEPLE FEED</div>
      {isLogin ? (
        <div className="feed-list-btn">
          <Button1 text="피드작성" clickEvent={write} />
        </div>
      ) : (
        ""
      )}

      <div className="feed-list-content-wrap">
        {feedList.map((feed, index) => {
          return (
            <FeedContent
              key={"feed" + index}
              feed={feed}
              isLogin={isLogin}
              id={id}
            />
          );
        })}
      </div>
      <button defaultValue={1} onClick={useFeedMore}>
        더보기
      </button>
    </div>
  );
};

const FeedContent = (props) => {
  const feed = props.feed;
  const isLogin = props.isLogin;
  const id = props.id;
  const navigate = useNavigate();
  const list = feed.imageList.map((img, index) => {
    return <img src={"/feed/" + img.fimageName} />;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [memberNo, setMemberNo] = useState();
  const [userLike, setUserLike] = useState(0);
  const token = window.localStorage.getItem("token");

  //좋아요내역 불러오기
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberNo(res.data.memberNo);
          axios
            .get("/feed/like/" + res.data.memberNo + "/" + feed.feedNo)
            .then((res) => {
              if (res.data !== null) {
                setUserLike(1);
                console.log(res.data);
              } else {
                setUserLike(0);
                console.log(res.data);
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);

  //more버튼모달
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
  const onCancel = (e) => {
    setIsOpen(false);
    // e.stopPropagation();
  };
  const deleteEvent = () => {
    Swal.fire({
      icon: "warning",
      text: "피드를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      setIsOpen(false);
      if (res.isConfirmed) {
        axios
          .get("/feed/delete/" + feed.feedNo)
          .then((res) => {
            if (res.data !== 0) {
              Swal.fire({
                icon: "success",
                text: "피드가 삭제되었습니다",
                confirmButtonText: "확인",
              }).then((res) => {
                navigate("/feed");
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  const modifyEvent = () => {
    navigate("/feed/modify", { state: { feed: feed } });
  };
  //댓글
  const [cmtIsOpen, setCmtIsOpen] = useState(false);
  const comment = () => {
    setCmtIsOpen(true);
  };
  const closeComent = () => {
    setCmtIsOpen(false);
  };
  return (
    <div className="feed-list-content">
      <div className="feed-list-top">
        <div className="feed-list-profile">
          <span className="material-icons-outlined">person</span>
        </div>
        <div className="feed-list-info">
          <div>{feed.feedWriter}</div>
          <div>{feed.feedDate}</div>
        </div>
      </div>
      <div className="feed-list-img">
        {feed.imageList.length > 1 ? (
          <SwiperComponent
            spaceBetween={21}
            slidesPerView={1}
            list={list}
            loop={false}
            autoplay={false}
            delButton={false}
          />
        ) : (
          <img src={"/feed/" + feed.imageList[0].fimageName} />
        )}
      </div>
      <div className="feed-list-text">
        <span>{feed.feedContent}</span>
      </div>
      <div className="feed-list-content-btn">
        <div>
          {userLike == 1 ? (
            <span className="material-icons-outlined">favorite</span>
          ) : (
            <span className="material-icons-outlined">favorite_border</span>
          )}
          <span>0</span>
        </div>
        <div onClick={comment}>
          <span className="material-icons">chat_bubble_outline</span>
          <span>0</span>
        </div>
      </div>
      <div className="feed-list-more-btn" onClick={moreModal}>
        <span className="material-icons-outlined">more_vert</span>
      </div>
      <MoreModal
        isOpen={isOpen}
        onCancel={onCancel}
        modifyEvent={modifyEvent}
        isLogin={isLogin}
        feedWriter={feed.feedWriter}
        deleteEvent={deleteEvent}
        id={id}
      />
      <FeedComment
        isOpen={cmtIsOpen}
        closeComent={closeComent}
        isLogin={isLogin}
        feedNo={props.feed.feedNo}
      />
    </div>
  );
};
export { FeedContent, FeedList };
