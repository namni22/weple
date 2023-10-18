import { Route, Routes, useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewWrite from "./ReviewWrite";
import ReviewModify from "./ReviewModify";

const ReviewMain = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const prev = () => {
    navigate(-1);
  };
  return (
    <>
      <Routes>
        <Route path="*" element={<ReviewList isLogin={isLogin} />} />
        <Route path="write" element={<ReviewWrite prev={prev} />} />
        <Route path="modify" element={<ReviewModify prev={prev} />} />
      </Routes>
    </>
  );
};
export default ReviewMain;
