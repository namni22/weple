import { useEffect, useState } from "react";
import "./afterMeet.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1, Button2, Button3 } from "../util/Button";

const EnrollMeetMember = (props) => {
  const myMeet = props.myMeet;
  console.log(myMeet.meetNo);

  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const [enrollMember, setEnrollMember] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/meet/enrollMember/" + reqPage + "?meetNo=" + myMeet.meetNo)
      .then((res) => {
        setEnrollMember(res.data.enrollMemberList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {});
  }, []);
  return (
    <div className="meetMemberList-all-wrap">
      {enrollMember.length === 0 ? (
        <>신청내역이 없습니다.</>
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

const EnrollItem = (props) => {
  const enroll = props.enroll;
  const setEnrollMember = props.setEnrollMember;
  const enrollMember = props.enrollMember;
  //신청자 수락 이벤트
  const changeStatus = () => {
    axios
      .post("/meet/updateEnrollMember", enroll)
      .then((res) => {
        const newArr = enrollMember.filter((newEnrollMember) => {
          return newEnrollMember.memberNo !== enroll.memberNo;
        });
        setEnrollMember(newArr);
      })
      .catch((res) => {});
  };
  return (
    <tr>
      <td width="5%">
        <div className="meetMemberList-img">
          {enroll.memberImage === null ? (
            <img src="/img/testImg_01.png" />
          ) : (
            <img src={enroll.memberImage} />
          )}
        </div>
      </td>
      <td width="60%">
        <div className="meetMemberList-name">{enroll.memberId}</div>
      </td>
      <td width="35%">
        <div className="meetMemberList-btn-wrap">
          <Button2 text={"수락"} clickEvent={changeStatus} />
        </div>
      </td>
    </tr>
  );
};
export default EnrollMeetMember;
