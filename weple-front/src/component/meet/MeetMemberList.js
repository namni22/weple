import { useEffect, useState } from "react";
import "./afterMeet.css";
import { JwButton1, JwButton2, JwButton3 } from "./meetUtil/JwButton";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";

const MeetMemberList = (props) => {
  const myMeet = props.myMeet;

  const [meetMember, setMeetMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  console.log(myMeet.meetNo);
  useEffect(() => {
    axios
      .get("/meet/meetMember/" + reqPage + "?meetNo=" + myMeet.meetNo)
      .then((res) => {
        console.log(res.data);
        setMeetMember(res.data.selectMeetMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="meetMemberList-all-wrap">
      {meetMember.map((member, index) => {
        return <MemberList key={"member" + index} member={member} />;
      })}
    </div>
  );
};
const MemberList = (props) => {
  const memberList = props.member;
  return (
    <>
      <table className="meetMemberList-wrap">
        <tbody>
          <tr>
            <td width="5%">
              <div className="meetMemberList-img">
                <img src={memberList.img} />
              </div>
            </td>
            <td width="60%">
              <div className="meetMemberList-name">{memberList.memberId}</div>
            </td>
            <td width="35%">
              <div className="meetMemberList-btn-wrap">
                <Button1 text={"호감도"} />
                <Button2 text={"신고"} />
                <Button3 text={"강퇴"} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default MeetMemberList;
