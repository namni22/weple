import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SwiperComponent from "../util/Swiper";
import { MoreModal } from "../util/Modal";

const FeedList = () => {
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState([]);
  const [start, setStart] = useState(1);

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
      <div className="feed-list-btn">
        <Button1 text="피드작성" clickEvent={write} />
      </div>
      <div className="feed-list-content-wrap">
        {feedList.map((feed, index) => {
          return (
            <FeedContent key={"feed" + index} navigate={navigate} feed={feed} />
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
  const navigate = props.navigate;
  const list = feed.imageList.map((img, index) => {
    return <img src={"/feed/" + img.fimageName} />;
  });
  //more버튼
  const [isOpen, setIsOpen] = useState(false);
  const handleClickCancel = () => {
    setIsOpen(false);
    console.log("취소하라고");
    console.log(isOpen);
  };
  const moreModal = () => {
    setIsOpen(true);
  };

  const deleteEvent = () => {
    navigate("/feed/modify");
  };
  const modifyEvent = () => {};

  const comment = () => {
    navigate("/feed/comment");
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
          <span className="material-icons-outlined">favorite_border</span>
          <span>0</span>
        </div>
        <div>
          <span className="material-icons" onClick={comment}>
            chat_bubble_outline
          </span>
          <span>0</span>
        </div>
      </div>
      <div className="feed-list-more-btn" onClick={moreModal}>
        <span className="material-icons-outlined">more_vert</span>
        <MoreModal
          isOpen={isOpen}
          onCancel={handleClickCancel}
          deleteEvent={deleteEvent}
        />
      </div>
    </div>
  );
};
export default FeedList;
