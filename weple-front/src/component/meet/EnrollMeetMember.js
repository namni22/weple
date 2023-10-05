import { useEffect, useState } from "react";
import "./afterMeet.css";
import axios from "axios";

const EnrollMeetMember = () => {
  const [enrollMember, setEnrollMember] = useState([]);
  useEffect(() => {
    axios
      .get("/meet/enrollMember", { params: enrollMember })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div>
      <div>신청자목록페이지</div>
    </div>
  );
};

export default EnrollMeetMember;
