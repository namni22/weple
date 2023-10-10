import { useEffect, useState } from "react";
import "./afterMeet.css";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import MyModal from "../util/Modal";
import ReactDOM from "react-dom";

const MeetMemberList = (props) => {
  const [isOpen, setOpen] = useState(false);

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
        return (
          <MemberList
            key={"member" + index}
            member={member}
            isOpen={isOpen}
            setOpen={setOpen}
          />
        );
      })}
    </div>
  );
};
const MemberList = (props) => {
  const memberList = props.member;
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;

  const handleClick = () => setOpen(true);

  const handleClickSubmit = () => {
    setOpen(false);
  };

  const handleClickCancel = () => setOpen(false);

  const likeEvent = () => {
    console.log("호감도 이벤트");
  };
  const reportEvent = () => {
    console.log("신고 이벤트");
    setOpen(true);
  };
  const deleteEvent = () => {
    console.log("추방 이벤트");
  };
  return (
    <>
      <table className="meetMemberList-wrap">
        <tbody>
          <tr>
            <td width="5%">
              <div className="meetMemberList-img">
                {memberList.memberImage === null ? (
                  <img src="/img/testImg_01.png" />
                ) : (
                  ""
                )}
              </div>
            </td>
            <td width="60%">
              <div className="meetMemberList-name">{memberList.memberId}</div>
            </td>
            <td width="35%">
              <div className="meetMemberList-btn-wrap">
                <Button1 text={"호감도"} clickEvent={likeEvent} />
                <Button2 text={"신고"} clickEvent={reportEvent} />
                <Button3 text={"추방"} clickEvent={deleteEvent} />

                <MyModal
                  isOpen={isOpen}
                  onSubmit={handleClickSubmit}
                  onCancel={handleClickCancel}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MeetMemberList;
