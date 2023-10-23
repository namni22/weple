import { useEffect, useState } from "react";
import "./afterMeet.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1, Button2, Button3 } from "../util/Button";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const EnrollMeetMember = (props) => {
  const myMeet = props.myMeet;
  const setMyMeet = props.setMyMeet;
  const [enrollMember, setEnrollMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/meet/enrollMember/" + reqPage + "?meetNo=" + myMeet.meetNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setEnrollMember(res.data.enrollMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {});
  }, [reqPage]);
  return (
    <div className="meetMemberList-all-wrap">
      <div className="meet-div-border">
        {enrollMember.length === 0 ? (
          <div className="meet-noMember-div">
            <p>NO LIST(●'◡'●)</p>
          </div>
        ) : (
          <>
            <table className="meetMemberList-wrap">
              <tbody>
                {enrollMember.map((enroll, index) => {
                  return (
                    <EnrollItem
                      key={"enroll" + index}
                      enroll={enroll}
                      enrollMember={enrollMember}
                      setEnrollMember={setEnrollMember}
                      meetNo={myMeet.meetNo}
                      setMyMeet={setMyMeet}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {enrollMember.length === 0 ? (
        <></>
      ) : (
        <div>
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setData={setEnrollMember}
          />
        </div>
      )}
    </div>
  );
};

const EnrollItem = (props) => {
  const enroll = props.enroll;
  const setEnrollMember = props.setEnrollMember;
  const enrollMember = props.enrollMember;
  const meetNo = props.meetNo;
  const setMyMeet = props.setMyMeet;
  const navigate = useNavigate();
  //신청자 수락 이벤트
  const changeStatus = () => {
    //남은 인원과 총인원이 같을 경우
    axios
      //남은 인원과 총 인원이 같이 않을 경우
      .post("/meet/updateEnrollMember/" + meetNo, enroll)
      .then((res) => {
        console.log(res.data);
        if (res.data === 2) {
          Swal.fire(
            "더 이상 회원을 추가할 수 없습니다.",
            "회원수락 실패",
            "warning"
          );
        } else if (res.data === 1) {
          Swal.fire("회원 수락 완료하였습니다.", "회원수락 완료", "success");
          const newArr = enrollMember.filter((newEnrollMember) => {
            return newEnrollMember.memberNo !== enroll.memberNo;
          });
          setEnrollMember(newArr);
          axios
            .get("/meet/selectOneMeet/" + meetNo)
            .then((res) => {
              setMyMeet(res.data);
            })
            .catch((res) => {});
        }
      })
      .catch((res) => {});
  };

  const enrollDelete = () => {
    //삭제버튼 눌렀을 때

    axios
      .post("/meet/deleteEnrollMember/" + meetNo, enroll)
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          Swal.fire("삭제 완료하였습니다.", "삭제 완료", "success");
          const newArr = enrollMember.filter((newEnrollMember) => {
            return newEnrollMember.memberNo !== enroll.memberNo;
          });
          setEnrollMember(newArr);
        }
      })
      .catch((res) => {});
  };

  const goMemberProfile = () => {
    navigate("/memberProfile", { state: { memberId: enroll.memberId } });
  };
  return (
    <tr>
      <td width="5%">
        <div className="meetMemberList-img" onClick={goMemberProfile}>
          {enroll.memberImage === null ? (
            <img src="/img/testImg_01.png" />
          ) : (
            <img src={enroll.memberImage} />
          )}
        </div>
      </td>
      <td width="60%">
        <div className="meetMemberList-name">
          {enroll.memberId}
          <span>님</span>
        </div>
        <div className="like">{enroll.memberLike}</div>
      </td>
      <td>
        <div className="meetMemberList-btn-wrap">
          <Button2 text={"삭제"} clickEvent={enrollDelete} />
          <Button2 text={"수락"} clickEvent={changeStatus} />
        </div>
      </td>
    </tr>
  );
};
export default EnrollMeetMember;
