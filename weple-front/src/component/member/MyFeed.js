import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button1 } from "../util/Button";
import { useNavigate } from "react-router-dom";
import FeedView from "../feed/FeedView";
import { FeedComment } from "../feed/FeedComment";

const MyFeed = (props) => {
  const memberId = props.memberId;
  const [myFeedList, setMyFeedList] = useState([]);
  const [start, setStart] = useState(1);
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;

  // 내가 쓴 피드 가져오기(아이디로)
  const amount = 9;
  useEffect(() => {
    console.log("memberId", memberId);
    const end = start + amount - 1;
    if (memberId) {
      axios
        .get("/member/myFeedList/" + start + "/" + end + "/" + memberId)
        .then((res) => {
          console.log("데이터 :  " + res.data);
          if (res.data !== "") {
            res.data.forEach((item) => {
              myFeedList.push(item);
              setMyFeedList([...myFeedList]);
            });
          } else {
            console.log("얘는 왜 안 찍혀");
            Swal.fire("내 피드가 없습니다. 피드를 작성해보세요.");
          }
        })
        .catch((res) => {
          console.log("오류");
        });
    }
  }, [memberId, start]);

  const useFeedMore = (e) => {
    setStart(start + amount);
  };

  return (
    <div className="myFeed-wrap">
      <div className="profile-sub-content">
        <div className="myFeed-content">
          {myFeedList.map((myFeed, index) => {
            return (
              <MyFeedItem
                key={"myFeed" + index}
                myFeed={myFeed}
                isLogin={isLogin}
                isAdmin={isAdmin}
              />
            );
          })}
        </div>
        <div className="myfeed-content-more-btn">
          <Button1 text="더보기" dValue={1} clickEvent={useFeedMore} />
        </div>
      </div>
    </div>
  );
};

const MyFeedItem = (props) => {
  const isLogin = props.isLogin;
  const isAdmin = props.isAdmin;
  const myFeed = props.myFeed;
  const myFeedImg = myFeed.imageList;
  const navigate = useNavigate();
  const [viewOpen, setViewOpen] = useState(false);
  const [cmtIsOpen, setCmtIsOpen] = useState(false); //댓글모달
  const [loadList, setLoadList] = useState(0);
  const [fCommentRefNo, setFCommentRefNo] = useState(null);
  const [rcmId, setRcmId] = useState(""); //답글남길 아이디 띄우기

  // 피드 상세보기 모달
  const myFeedView = () => {
    setViewOpen(true);
  };

  const closeView = (e) => {
    setViewOpen(false);
    e.stopPropagation();
  };

  //댓글모달
  const myFeedComment = (e) => {
    setCmtIsOpen(true);
    setRcmId("");
    setFCommentRefNo(null);
    // 댓글 버튼 누를 때 피드까지 뜨는 버블링 막는 코드
    e.stopPropagation();
    // setLoadList(loadList + 1);
  };
  const closeComent = () => {
    setCmtIsOpen(false);
  };

  return (
    <div>
      <div className="myFeed-item" onClick={myFeedView}>
        {myFeed.imageList === null ? (
          <img src="/img/testImg_01.png" />
        ) : (
          <img src={"/feed/" + myFeedImg[0]?.fimageName} />
        )}
        <span className="material-icons myFeedBubble" onClick={myFeedComment}>
          chat_bubble_outline
        </span>
      </div>
      <FeedView
        isOpen={viewOpen}
        closeView={closeView}
        feedNo={myFeed.feedNo}
        isLogin={isLogin}
        loadList={loadList}
        setLoadList={setLoadList}
        isAdmin={isAdmin}
      />
      <FeedComment
        isOpen={cmtIsOpen}
        closeComent={closeComent}
        isLogin={isLogin}
        feedNo={myFeed.feedNo}
        fCommentRefNo={fCommentRefNo}
        setFCommentRefNo={setFCommentRefNo}
        rcmId={rcmId}
        setRcmId={setRcmId}
        loadList={loadList}
        setLoadList={setLoadList}
      />
    </div>
  );
};

export default MyFeed;
