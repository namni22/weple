import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Button";

const FeedList = () => {
  const navigate = useNavigate();
  const write = () => {
    navigate("/feed/write");
  };
  const comment = () => {
    navigate("/feed/comment");
  };
  return (
    <div>
      <div className="feed-title">WEPLE FEED</div>
      <div className="feed-list-btn">
        <Button1 text="피드작성" clickEvent={write} />
      </div>
      <div className="feed-list-content-wrap">
        <div className="feed-list-content">
          <div className="feed-list-top">
            <div className="feed-list-profile">
              <span className="material-icons-outlined">person</span>
            </div>
            <div className="feed-list-info">
              <div>닉네임</div>
              <div>업로드일</div>
            </div>
          </div>
          <div className="feed-list-img"></div>
          <div className="feed-list-text">
            <span>
              내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이
              출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이
              출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이
              출력됩니다.내용이 출력됩니다.내용이 출력됩니다.내용이
              출력됩니다.내용이 출력됩니다.내용이 출력됩니다.
            </span>
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
          <div className="feed-list-more-btn">
            <span className="material-icons-outlined">more_vert</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedList;
