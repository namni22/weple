import { Route, Routes, useNavigate } from "react-router-dom";
import "./feed.css";
import FeedList from "./FeedList";
import FeedComment from "./FeedComment";
import FeedWrite from "./FeedWrite";

const Feed = () => {
  const navigate = useNavigate();
  const prev = () => {
    navigate(-1);
  };
  return (
    <div className="feed-wrap">
      <Routes>
        <Route path="*" element={<FeedList />} />
        <Route
          path="write"
          element={<FeedWrite prev={prev} navigate={navigate} />}
        />
        <Route path="comment" element={<FeedComment prev={prev} />} />
      </Routes>
    </div>
  );
};
export default Feed;
