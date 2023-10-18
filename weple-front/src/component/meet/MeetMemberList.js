import { useEffect, useState } from "react";
import "./afterMeet.css";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import { ReportModal } from "../util/Modal";

const MeetMemberList = (props) => {
  const [isOpen, setOpen] = useState(false);
  const myMeet = props.myMeet;
  const id = props.id;
  const captainCheck = props.captainCheck;
  console.log("captainCheck : ", captainCheck);
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const [meetMember, setMeetMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  console.log("모임회원리스트 : ", meetMember);
  useEffect(() => {
    axios
      .get("/meet/meetMember/" + reqPage + "?meetNo=" + myMeet.meetNo)
      .then((res) => {
        setMeetMember(res.data.selectMeetMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {});
  }, [reqPage]);
  return (
    <div className="meetMemberList-all-wrap">
      {meetMember.length === 0 ? (
        <>모임회원이 없습니다.</>
      ) : (
        <>
          <table className="meetMemberList-wrap">
            <tbody>
              {meetMember.map((member, index) => {
                return (
                  <MemberList
                    key={"member" + index}
                    member={member}
                    isOpen={isOpen}
                    setOpen={setOpen}
                    meetMember={meetMember}
                    setMeetMember={setMeetMember}
                    id={id}
                    meetNo={myMeet.meetNo}
                    captainCheck={captainCheck}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
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
  const meetMember = props.meetMember;
  const setMeetMember = props.setMeetMember;
  const captainCheck = props.captainCheck;
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;
  const id = props.id;
  const meetNo = props.meetNo;
  const reportItemNo = props.meetNo;
  const [disable, setDisable] = useState("");
  const handleClick = () => setOpen(true);

  // console.log("모달 전달 전 memberList.memberId : ", memberList);

  const handleClickSubmit = () => {
    setOpen(false);
  };
  const handleClickCancel = () => setOpen(false);
  const buttonDisable = () => setDisable("");
  const likeEvent = () => {
    Swal.fire({
      text: `"` + memberList.memberId + `"` + "님의 호감도를 올리시겠습니까?",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      //reverseButtons: true,  버튼 순서 거꾸로
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/meet/memberLike", memberList)
          .then((res) => {})
          .catch((res) => {});
        Swal.fire({
          text: `"` + memberList.memberId + `"` + "님의 호감도를 올렸습니다.",
          icon: "success",
        });
        setDisable(true);
      }
    });
  };
  const reportEvent = () => {
    setOpen(true);
  };
  const deleteEvent = () => {
    Swal.fire({
      text: `"` + memberList.memberId + `"` + "님을 추방시키시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios
          .post("/meet/deleteMember/" + meetNo, memberList)
          .then((res) => {
            if (res.data === 1) {
              const newArr = meetMember.filter((newMeetMember) => {
                return newMeetMember.memberNo !== memberList.memberNo;
              });
              setMeetMember(newArr);
              Swal.fire("탈퇴 완료하였습니다.", "회원탈퇴 완료", "success");
            }
            Swal.fire("탈퇴 실패하였습니다.", "회원탈퇴 실패", "error");
          })
          .catch((res) => {});
      }
    });
  };
  // console.log("모달 전달 전 memberId : ", memberList.memberId);
  return (
    <tr>
      <td width="5%">
        <div className="meetMemberList-img">
          {memberList.memberImage === null ? (
            <img src="/img/testImg_01.png" />
          ) : (
            <img src={memberList.memberImage} />
          )}
        </div>
      </td>
      <td width="60%">
        <div className="meetMemberList-name">{memberList.memberId}</div>
      </td>
      <td width="35%">
        <div className="meetMemberList-btn-wrap">
          <Button2 text={"호감도"} clickEvent={likeEvent} disable={disable} />
          <Button2 text={"신고"} clickEvent={reportEvent} />

          {captainCheck ? (
            <Button2 text={"추방"} clickEvent={deleteEvent} />
          ) : (
            ""
          )}
        </div>
      </td>
      <ReportModal
        isOpen={isOpen}
        onSubmit={handleClickSubmit}
        onCancel={handleClickCancel}
        memberId={id}
        reportItemNo={reportItemNo}
        reportMemberId={memberList.memberId}
      />
    </tr>
  );
};

export default MeetMemberList;
