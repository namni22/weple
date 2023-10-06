import { useEffect, useState } from "react";
import "./afterMeet.css";
import axios from "axios";
import Pagination from "../common/Pagination";

const EnrollMeetMember = (props) => {
  const myMeet = props.myMeet;
  console.log(myMeet.meetNo);
  const [enrollMember, setEnrollMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/meet/enrollMember/" + reqPage + "?meetNo=" + myMeet.meetNo)
      .then((res) => {
        console.log(res.data);
        setEnrollMember(res.data.enrollMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div>
      <div>
        {enrollMember.map((enroll, index) => {
          return <EnrollItem key={"enroll" + index} enroll={enroll} />;
        })}
      </div>
      <div>
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const EnrollItem = (props) => {
  const enroll = props.enroll;
  return <div>{enroll.memberId}</div>;
};
export default EnrollMeetMember;
