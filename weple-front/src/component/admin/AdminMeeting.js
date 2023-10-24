import { useEffect, useState } from "react";
import "./admin.css";

import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Button";
const AdminMeeting = () => {
  const [meetList, setMeetList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/admin/meetList/" + reqPage)
      .then((res) => {
        // console.log(res.data.list);
        setMeetList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  return (
    <div className="admin-meeting-wrap">
      <div className="admin-meeting-top">
        <div className="admin-menu-title">
          <h1>모임 신청 내역</h1>
        </div>
        <div className="admin-meet-tbl-box">
          <table>
            <thead>
              <tr>
                <td width={"20%"}>모임장</td>
                <td width={"35%"}>모임제목</td>
                <td width={"20%"}>모집인원</td>
                <td width={"25%"}>승인</td>
              </tr>
            </thead>
            <tbody>
              {meetList.map((meet, index) => {
                return <MeetingItem key={"meet" + index} meet={meet} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-paging-wrap">
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
            setData={setMeetList}
          />
        </div>
      </div>
    </div>
  );
};
const MeetingItem = (props) => {
  const meet = props.meet;
  const [meetType, setMeetType] = useState(meet.meetType);
  const meetNo = meet.meetNo;

  const options = ["검수중", "승인완료", "거절"];

  const clickChange = (event) => {
    setMeetType(event.target.value);
  };
  const clickConfirm = (event) => {
    const obj = {
      meetNo: meetNo,
      meetType: meetType,
      meetCaptain: meet.meetCaptain,
    };

    const token = window.localStorage.getItem("token");
    axios
      .post("/admin/changeMeetType", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          setMeetType(meetType);
          Swal.fire("변경 성공하셨습니다.");

          if (meetType === "1") {
            axios
              .post("/admin/insertFollower", obj)
              .then((res) => {
                if (res.data === 1) {
                  Swal.fire("변경 성공하셨습니다.");
                }
              })
              .catch((res) => {});
          }
        } else {
          Swal.fire("변경 중 문제가 발생했습니다.");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <tr>
      <td>{meet.meetCaptain}</td>
      <td>{meet.meetTitle}</td>
      <td>{meet.meetTotal}</td>
      <td className="selectGrade">
        <select value={meetType} onChange={clickChange}>
          {options.map((option, index) => {
            return (
              <option value={index} key={"option" + index}>
                {" "}
                {option}{" "}
              </option>
            );
          })}
        </select>
        <Button1 text="변경" clickEvent={clickConfirm} />
      </td>
    </tr>
  );
};
export default AdminMeeting;
