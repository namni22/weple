import { Route, Routes, useNavigate } from "react-router-dom";
import "./feed.css";
import { FeedList } from "./FeedList";
import FeedComment from "./FeedComment";
import FeedWrite from "./FeedWrite";

const Feed = (props) => {
  const navigate = useNavigate();
  const prev = () => {
    navigate(-1);
  };
  const isLogin = props.isLogin;

  return (
    <div className="feed-wrap">
      <Routes>
        <Route path="*" element={<FeedList isLogin={isLogin} />} />
        <Route
          path="write"
          element={
            <FeedWrite prev={prev} navigate={navigate} isLogin={isLogin} />
          }
        />
        <Route
          path="comment"
          element={<FeedComment prev={prev} isLogin={isLogin} />}
        />
      </Routes>
    </div>
  );
};
export default Feed;
