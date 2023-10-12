import { useEffect, useState } from "react";
import "./afterMeet.css";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import { MyModal } from "../util/Modal";

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
  }, [reqPage]);
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
    console.log(memberList);
    Swal.fire({
      title: "정말 탈퇴시키시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios
          .post("/meet/deleteMember", memberList)
          .then((res) => {
            console.log(res.data);
          })
          .catch((res) => {
            console.log(res.response.data);
          });
        Swal.fire("탈퇴 완료하였습니다.", "회원탈퇴 완료", "success");
      }
    });
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
                  memberId={memberList.memberId}
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
