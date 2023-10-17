import { Route, Routes } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewWrite from "./ReviewWrite";

const ReviewMain = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<ReviewList />} />
        <Route path="write" element={<ReviewWrite />} />
      </Routes>
    </>
  );
};
export default ReviewMain;
