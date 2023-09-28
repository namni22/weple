import { Route, Routes, useNavigate } from "react-router-dom";
import "./feed.css";
import FeedList from "./FeedList";
import FeedWriteFrm from "./FeedWriteFrm";
import FeedComment from "./FeedComment";

const Feed = () => {
  const navigate = useNavigate();
  const prev = () => {
    navigate(-1);
  };
  return (
    <div className="feed-wrap">
      <Routes>
        <Route path="*" element={<FeedList />} />
        <Route path="write" element={<FeedWriteFrm prev={prev} />} />
        <Route path="comment" element={<FeedComment prev={prev} />} />
      </Routes>
    </div>
  );
};
export default Feed;
