import { useState } from "react";
import FeedWriteFrm from "./FeedWriteFrm";

const FeedWrite = (props) => {
  const prev = props.prev;
  const [feedContent, setFeedContent] = useState(""); //피드내용
  const [feedThumb, setFeedThumb] = useState([]); //서버 전송용 배열
  const [feedBox, setFeedBox] = useState([]); //화면 구현용 배열

  return (
    <div>
      <div className="feed-title">
        FEED UPLOAD
        <span className="material-icons" onClick={prev}>
          close
        </span>
      </div>
      <FeedWriteFrm
        feedContent={feedContent}
        setFeedContent={setFeedContent}
        feedThumb={feedThumb}
        setFeedThumb={setFeedThumb}
        feedBox={feedBox}
        setFeedBox={setFeedBox}
      />
    </div>
  );
};

export default FeedWrite;
