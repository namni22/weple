import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ReactModal from "react-modal";
import SwiperComponent from "../util/Swiper";
import { Button1 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { CommentWrap } from "./FeedComment";

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
  const [feed, setFeed] = useState({});
  const [feedBox, setFeedBox] = useState([]);
  const [memberId, setMemberId] = useState();
  const [memberImage, setMemberImage] = useState("");
  const [fCommentContent, setFCommentContent] = useState("");
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기
  const [load, setLoad] = useState(0); //useEffect용

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

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div className="feed-view">
        <span className="material-icons close" onClick={closeView}>
          close
        </span>
        <div className="feed-list-top">
          <div className="feed-list-profile">
            {feed.memberImage ? (
              <img src={"/member/" + feed.memberImage} />
            ) : (
              <img src="/img/testImg_01.png" />
            )}
          </div>
          <div className="feed-list-info">
            <div>{feed.feedWriter}</div>
            <div>{feed.feedDate}</div>
          </div>
        </div>
        <FeedViewContent
          feedContent={feed.feedContent}
          feedBox={feedBox}
          closeView={closeView}
        />
        {/* <div className="feed-title">comment</div>
        <CommentWrap
          feedNo={feedNo}
          commentList={feed.fcomment}
          isLogin={isLogin}
          fCommentContent={fCommentContent}
          setFCommentContent={setFCommentContent}
          fCommentRefNo={fCommentRefNo}
          setFCommentRefNo={setFCommentRefNo}
          rcmId={rcmId}
          setRcmId={setRcmId}
          load={load}
          setLoad={setLoad}
          memberId={memberId}
          memberImage={memberImage}
        /> */}
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
          s
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
export default FeedView;
