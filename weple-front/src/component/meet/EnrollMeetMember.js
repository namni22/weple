import { useEffect, useState } from "react";
import "./afterMeet.css";
import axios from "axios";

const EnrollMeetMember = (props) => {
  const myMeet = props.myMeet;
  console.log(myMeet.meetNo);
  const [enrollMember, setEnrollMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/meet/enrollMember/" + reqPage, { params: myMeet.meetNo })
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        //console.log(res.response.status);
      });
  }, []);
  return (
    <div>
      <div>신청자목록페이지</div>
    </div>
  );
};

export default EnrollMeetMember;
