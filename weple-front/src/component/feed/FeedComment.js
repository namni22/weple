const FeedComment = (props) => {
  const prev = props.prev;
  return (
    <div>
      <div className="feed-title">
        COMMENT
        <span class="material-icons" onClick={prev}>
          close
        </span>
      </div>
      <div className="feed-comment-wrap">
        <div className="feed-comment">
          <div className="feed-list-top">
            <div className="feed-list-profile">
              <span className="material-icons-outlined">person</span>
            </div>
            <div className="feed-list-info">
              <div>
                닉네임<span>2023.00.00</span>
              </div>
              <div>좋아요 0개</div>
            </div>
          </div>
          <div className="feed-comment-detail">
            <span className="feed-comment-text">
              댓글 내용을 출력해보자..~!
            </span>
            <span className="material-icons-outlined">favorite_border</span>
          </div>
        </div>

        <div className="feed-comment-write">
          <div className="feed-comment-left">
            <div className="feed-list-profile">
              <span className="material-icons-outlined">person</span>
            </div>
          </div>
          <div className="feed-comment-text">
            <input type="text" />
            <button>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedComment;
