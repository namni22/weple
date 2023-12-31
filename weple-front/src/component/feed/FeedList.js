import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SwiperComponent from "../util/Swiper";
import { MoreModal } from "../util/Modal";
import { FeedComment } from "./FeedComment";
import { FeedView } from "./FeedView";

const FeedList = (props) => {
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const isLogin = props.isLogin;
  const [loadList, setLoadList] = useState(0); //useEffect용
  const isAdmin = props.isAdmin;
  const [memberGrade, setMemberGrade] = useState({});

  const [total, setTotal] = useState();
  const [start, setStart] = useState(1);
  const amount = 9;
  const [end, setEnd] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMemberGrade(res.data.memberGrade);
      })
      .catch((res) => {
        console.log("feedwrite" + res.response.status);
      });

    axios
      .get("/feed/totalCount")
      .then((res) => {
        setTotal(res.data);
      })
      .catch((res) => {
        console.log(res.data.status);
        Swal.fire({
          icon: "error",
          title: "문제가 발생했습니다",
          text: "관리자에게 문의하세요",
          confirmButtonText: "확인",
        });
      });
  }, []);

  useEffect(() => {
    setEnd(start + amount - 1);
    const endNum = start + amount - 1;
    axios
      .get("/feed/list/" + start + "/" + endNum + "/")
      .then((res) => {
        const arr = [...feedList, ...res.data];
        setFeedList(arr);
      })
      .catch((res) => {
        console.log(res.data.status);
        Swal.fire({
          icon: "error",
          title: "문제가 발생했습니다",
          text: "관리자에게 문의하세요",
          confirmButtonText: "확인",
        });
      });
  }, [start]);

  const useFeedMore = () => {
    setStart(start + amount);
  };

  const write = () => {
    navigate("/feed/write");
  };
  return (
    <div>
      <div className="feed-title">WEPLE FEED</div>
      {isLogin && memberGrade !== 2 ? (
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
              loadList={loadList}
              setLoadList={setLoadList}
              isAdmin={isAdmin}
              memberGrade={memberGrade}
            />
          );
        })}
      </div>
      <div className="list-more-btn">
        {end >= total ? "" : <Button1 clickEvent={useFeedMore} text="더보기" />}
      </div>
    </div>
  );
};

const FeedContent = (props) => {
  const feed = props.feed;
  const isLogin = props.isLogin;
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const isAdmin = props.isAdmin;
  const memberGrade = props.memberGrade;
  const navigate = useNavigate();
  const list = feed.imageList.map((img, index) => {
    return <img src={"/feed/" + img?.fimageName} />;
  });
  const [isOpen, setIsOpen] = useState(false); //더보기모달
  const [cmtIsOpen, setCmtIsOpen] = useState(false); //댓글모달
  const [viewOpen, setViewOpen] = useState(false); //상세보기 모달
  const [userLike, setUserLike] = useState();
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [totalLike, setTotalLike] = useState(feed.totalLike);
  const [totalComment, setTotalComment] = useState(feed.totalComment);
  const token = window.localStorage.getItem("token");
  //엔터처리
  let feedContent = feed.feedContent;
  const text = feed.feedContent.replaceAll("<br>", "\r\n");
  if (text.length >= 15) {
    feedContent = text.substr(0, 14) + " ...더보기";
  } else {
    feedContent = text;
  }

  //좋아요내역 불러오기
  const feedNo = feed.feedNo;
  const f = { feedNo };
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/feed/like", f, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserLike(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [loadList]);

  //좋아요개수, 댓글개수
  useEffect(() => {
    axios
      .get("/feed/totalCount/" + feedNo)
      .then((res) => {
        setTotalLike(res.data.totalLike);
        setTotalComment(res.data.totalComment);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [loadList]);

  //좋아요클릭이벤트
  const likeEvent = () => {
    if (isLogin) {
      axios
        .post("/feed/updateLike", f, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            setUserLike(res.data);
          } else if (res.data == 2) {
            setUserLike(0);
          }
          setLoadList(loadList + 1);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "로그인이 필요한 기능입니다",
        confirmButtonText: "확인",
      });
    }
  };

  //more버튼모달
  const moreModal = () => {
    if (isLogin && memberGrade == 2) {
      Swal.fire({
        icon: "error",
        text: "기능을 이용하실 수 없습니다",
        confirmButtonText: "확인",
      });
    } else if (isLogin) {
      setIsOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 기능입니다",
        confirmButtonText: "확인",
      });
    }
  };
  const onCancel = () => {
    setIsOpen(false);
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
              }).then(() => {
                window.location.reload();
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

  //댓글모달
  const comment = () => {
    setCmtIsOpen(true);
    setRcmId("");
    setFCommentRefNo(null);
  };
  const closeComent = () => {
    setCmtIsOpen(false);
  };

  //상세보기모달
  const view = () => {
    setViewOpen(true);
  };
  const closeView = (e) => {
    setViewOpen(false);
    // e.stopPropagation();
  };
  const profile = () => {
    navigate("/memberProfile", { state: { memberId: feed.feedWriter } });
  };
  useEffect(() => {
    const swipernext = document.querySelectorAll(".swiper-button-next");
    const swiperprev = document.querySelectorAll(".swiper-button-prev");
    swipernext.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
    swiperprev.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }, []);

  return (
    <div className="feed-list-content">
      <div className="feed-list-top">
        <div className="feed-list-profile">
          {feed.memberImage !== null ? (
            <img src={"/member/" + feed.memberImage} onClick={profile} />
          ) : (
            <img src="/img/testImg_01.png" onClick={profile} />
          )}
        </div>
        <div className="feed-list-info" onClick={profile}>
          <div>{feed.feedWriter}</div>
          <div>{feed.feedDate}</div>
        </div>
      </div>
      <div onClick={view}>
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
            <img src={"/feed/" + feed.imageList[0]?.fimageName} />
          )}
        </div>
        <div className="feed-list-text">
          <div>{feedContent}</div>
        </div>
      </div>
      <div className="feed-list-content-btn">
        <div>
          {userLike === 1 ? (
            <span className="material-icons-outlined" onClick={likeEvent}>
              favorite
            </span>
          ) : (
            <span className="material-icons-outlined" onClick={likeEvent}>
              favorite_border
            </span>
          )}
          <span>{totalLike}</span>
        </div>
        <div onClick={comment}>
          <span className="material-icons">chat_bubble_outline</span>
          <span>{totalComment}</span>
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
        isAdmin={isAdmin}
        feedNo={feed.feedNo}
        reportTypeValue={2}
        reportType={2}
      />
      <FeedComment
        isOpen={cmtIsOpen}
        closeComent={closeComent}
        isLogin={isLogin}
        feedNo={props.feed.feedNo}
        fCommentRefNo={fCommentRefNo}
        setFCommentRefNo={setFCommentRefNo}
        rcmId={rcmId}
        setRcmId={setRcmId}
        loadList={loadList}
        setLoadList={setLoadList}
        memberGrade={memberGrade}
      />
      <FeedView
        isOpen={viewOpen}
        closeView={closeView}
        feedNo={feed.feedNo}
        isLogin={isLogin}
        loadList={loadList}
        setLoadList={setLoadList}
        isAdmin={isAdmin}
        memberGrade={memberGrade}
        profile={profile}
      />
    </div>
  );
};

export { FeedContent, FeedList };
