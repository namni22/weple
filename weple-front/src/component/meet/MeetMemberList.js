import { useEffect, useState } from "react";
import "./afterMeet.css";
import { Button1, Button2, Button3 } from "../util/Button";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";
import { ReportModal } from "../util/Modal";

const MeetMemberList = (props) => {
  const myMeet = props.myMeet;
  const setMyMeet = props.setMyMeet;
  const isLogin = props.isLogin;
  const [meetMember, setMeetMember] = useState([]);
  const [userLike, setUserLike] = useState();
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/meet/meetMember/" + reqPage + "?meetNo=" + myMeet.meetNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMeetMember(res.data.selectMeetMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {});
  }, [reqPage]);
  return (
    <div className="meetMemberList-all-wrap">
      <div className="meet-div-border">
        {meetMember.length === 0 ? (
          <div className="meet-noMember-div">
            <p>NO LIST(●'◡'●)</p>
          </div>
        ) : (
          <>
            <table className="meetMemberList-wrap">
              <tbody>
                {meetMember.map((member, index) => {
                  return (
                    <MemberList
                      key={"member" + index}
                      member={member}
                      meetMember={meetMember}
                      setMeetMember={setMeetMember}
                      meetNo={myMeet.meetNo}
                      myMeet={myMeet}
                      setMyMeet={setMyMeet}
                      isLogin={isLogin}
                      userLike={userLike}
                      setUserLike={setUserLike}
                      reqPage={reqPage}
                      setPageInfo={setPageInfo}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {meetMember.length === 0 ? (
        <></>
      ) : (
        <div>
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setData={setMeetMember}
          />
        </div>
      )}
    </div>
  );
};
const MemberList = (props) => {
  const memberList = props.member;
  const meetMember = props.meetMember;
  const setMeetMember = props.setMeetMember;
  const setMyMeet = props.setMyMeet;
  const myMeet = props.myMeet;
  const reqPage = props.reqPage;
  const setPageInfo = props.setPageInfo;
  const meetNo = props.meetNo;
  const [disable, setDisable] = useState("");
  const [reportTypeValue, setReportTypeValue] = useState(0);
  const [reportType, setReportType] = useState(0);
  const handleClick = () => setOpen(true);
  const [isOpen, setOpen] = useState(false);
  const isLogin = props.isLogin;
  const [memberId, setMemberId] = useState("");
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
        })
        .catch((res) => {});
    }
  }, []);
  const handleClickSubmit = () => {
    setOpen(false);
  };
  const handleClickCancel = () => setOpen(false);
  const buttonDisable = () => setDisable("");
  const likeEvent = () => {
    if (memberList.memberId === memberId) {
      Swal.fire({
        text: "본인의 호감도는 올릴 수 없습니다",
      });
    } else {
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
            .then((res) => {
              console.log("호감도를 누르고 성공한 data : ", res.data);
              if (res.data === 1) {
                console.log("memberId : ", memberId);
                console.log("memeberList.Id : ", memberList.memberNo);
                console.log("meetNo : " + meetNo);
                console.log("reqPage : " + reqPage);
                const token = window.localStorage.getItem("token");
                axios
                  .get(
                    "/meet/memberLikeStatus/" +
                      reqPage +
                      "?meetNo=" +
                      meetNo +
                      "&takerNo=" +
                      memberList.memberNo,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    }
                  )
                  .then((res) => {
                    setMeetMember(res.data.selectMeetMemberList);
                    setPageInfo(res.data.pi);
                    setDisable(true);
                  })
                  .catch((res) => {});
                Swal.fire({
                  text:
                    `"` +
                    memberList.memberId +
                    `"` +
                    "님의 호감도를 올렸습니다.",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  text: "실패하였습니다.",
                  icon: "error",
                });
              }
            })
            .catch((res) => {});
        }
      });
    }
  };
  const reportEvent = () => {
    if (memberList.memberId === memberId) {
      Swal.fire({
        text: "본인은 신고할 수 없습니다",
      });
    } else {
      setOpen(true);
    }
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

              axios
                .get("/meet/selectOneMeet/" + meetNo)
                .then((res) => {
                  setMyMeet(res.data);
                })
                .catch((res) => {});

              Swal.fire("탈퇴 완료하였습니다.", "회원탈퇴 완료", "success");
            } else {
              Swal.fire("탈퇴 실패하였습니다.", "회원탈퇴 실패", "error");
            }
          })
          .catch((res) => {});
      }
    });
  };

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
        <div className="meetMemberList-name">
          {memberList.memberId}
          <span>님</span>
        </div>
        <div className="like">{memberList.memberLike}</div>
      </td>
      <td width="35%">
        <div className="meetMemberList-btn-wrap">
          <Button2 text={"신고"} clickEvent={reportEvent} />

          {myMeet.meetCaptain === memberId ? (
            <Button2 text={"추방"} clickEvent={deleteEvent} />
          ) : (
            ""
          )}
          {memberList.isLike === 0 ? (
            <Button2 text={"호감도"} clickEvent={likeEvent} disable={disable} />
          ) : (
            <Button2 text={"호감도"} clickEvent={likeEvent} disable={true} />
          )}
        </div>
      </td>
      <ReportModal
        isOpen={isOpen}
        onSubmit={handleClickSubmit}
        onCancel={handleClickCancel}
        isLogin={true}
        reportItemNo={memberList.memberNo}
        reportMemberId={memberList.memberId}
        reportTypeValue={reportTypeValue}
        setReportTypeValue={setReportTypeValue}
        reportType={reportType}
        setReportType={setReportType}
      />
    </tr>
  );
};

export default MeetMemberList;
