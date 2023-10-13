import { Route, Routes, useNavigate } from "react-router-dom";
import "./feed.css";
import { FeedList } from "./FeedList";
import FeedComment from "./FeedComment";
import FeedWrite from "./FeedWrite";
import FeedModify from "./FeedModify";

const Feed = (props) => {
  const navigate = useNavigate();
  const prev = () => {
    navigate(-1);
  };
  const isLogin = props.isLogin;
  const id = props.id;

  return (
    <div className="feed-wrap">
      <Routes>
        <Route path="*" element={<FeedList isLogin={isLogin} id={id} />} />
        <Route path="write" element={<FeedWrite prev={prev} />} />
        <Route path="modify" element={<FeedModify prev={prev} />} />
        <Route
          path="comment"
          element={<FeedComment prev={prev} isLogin={isLogin} />}
        />
      </Routes>
    </div>
  );
};
export default Feed;
