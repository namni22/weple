import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ReactModal from "react-modal";
import SwiperComponent from "../util/Swiper";
import { Button1, Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { CommentWrap } from "./FeedComment";
import { MoreModal } from "../util/Modal";

const FeedView = (props) => {
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

  const isOpen = props.isOpen;
  const isLogin = props.isLogin;
  const closeView = props.closeView;
  const feedNo = props.feedNo;
  const isAdmin = props.isAdmin;
  const [feed, setFeed] = useState({});
  const [feedBox, setFeedBox] = useState([]);
  const [memberId, setMemberId] = useState();
  const [memberImage, setMemberImage] = useState("");
  const [fCommentContent, setFCommentContent] = useState("");
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기
  const [load, setLoad] = useState(0); //useEffect용
  const memberGrade = props.memberGrade;
  const profile = props.profile;

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
          setMemberImage(res.data.memberImage);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [load]);

  useEffect(() => {
    axios
      .get("/feed/one/" + feedNo)
      .then((res) => {
        setFeed(res.data);
        const imgArr = [];
        for (let i = 0; i < res.data.imageList.length; i++) {
          imgArr.push(
            <img src={"/feed/" + res.data.imageList[i]?.fimageName} />
          );
        }
        setFeedBox(imgArr);
      })
      .catch((res) => {
        console.log(res.response.status);
        Swal.fire("실패");
      });
  }, [feedNo]);

  //more버튼모달
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const [isOpenMore, setIsOpenMore] = useState(false); //더보기모달
  const navigate = useNavigate();
  const moreModal = () => {
    if (isLogin && memberGrade == 2) {
      Swal.fire({
        icon: "error",
        text: "기능을 이용하실 수 없습니다",
        confirmButtonText: "확인",
      });
    } else if (isLogin) {
      setIsOpenMore(true);
    } else {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 기능입니다",
        confirmButtonText: "확인",
      });
    }
  };
  const onCancel = (e) => {
    setIsOpenMore(false);
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
      setIsOpenMore(false);
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
                closeView();
                setLoadList(loadList + 1);
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

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <MoreModal
        isOpen={isOpenMore}
        onCancel={onCancel}
        modifyEvent={modifyEvent}
        isLogin={isLogin}
        feedWriter={feed.feedWriter}
        deleteEvent={deleteEvent}
        isAdmin={isAdmin}
        feedNo={feed.feedNo}
        reportTypeValue={2}
        reportType={2}
        memberGrade={memberGrade}
      />
      <div className="feed-view">
        <div className="feed-view-top">
          <div className="feed-list-more-btn" onClick={moreModal}>
            <span className="material-icons-outlined">more_vert</span>
          </div>
          <div className="feed-list-top">
            <div className="feed-list-profile">
              {feed.memberImage ? (
                <img src={"/member/" + feed.memberImage} onClick={profile} />
              ) : (
                <img src="/img/testImg_01.png" onClick={profile} />
              )}
            </div>
            <div className="feed-list-info">
              <div>{feed.feedWriter}</div>
              <div>{feed.feedDate}</div>
            </div>
          </div>
        </div>
        <FeedViewContent
          feedContent={feed.feedContent}
          feedBox={feedBox}
          closeView={closeView}
        />
        <Button1 text="닫기" clickEvent={closeView} />
      </div>
    </ReactModal>
  );
};

const FeedViewContent = (props) => {
  const fc = props.feedContent;
  const feedContent = fc.replaceAll("<br>", "\r\n"); //엔터처리
  //   const [feedContent, setFeedContent] = useState("");
  //   setFeedContent(fc.replaceAll("<br>", "\r\n")); //엔터처리
  const feedBox = props.feedBox;

  return (
    <div className="feed-view-wrap">
      <div className="feed-write-img">
        <SwiperComponent
          spaceBetween={21}
          slidesPerView={1}
          list={feedBox}
          loop={false}
          autoplay={false}
          delButton={false}
        />
      </div>
      <div className="feed-list-text">
        <div>{feedContent}</div>
      </div>
    </div>
  );
};
export { FeedViewContent, FeedView };
