import { useEffect, useState } from "react";
import "./admin.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import Pagination from "../common/Pagination";
const AdminMeeting = () => {
  const [meetList, setMeetList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/admin/meetList/" + reqPage)
      .then((res) => {
        console.log(res.data);
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
                return 
                  <MeetingItem key={"meet" + index} meet={meet} />
                ;
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-paging-wrap">
          <Pagination
            reqPage={reqPage}
            setReqPage={setReqPage}
            pageInfo={pageInfo}
          />
        </div>
      </div>
    </div>
  );
};
const MeetingItem = (props) => {
  const meet = props.meet;
  const [meetType, setMeetType] = useState(meet.meetType);

  const handleChange = (event) => {
    const obj = { meetNo: meet.meetNo, meetType: event.target.value };
   
    axios
      .post("/admin/changeMeetType", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setMeetType(event.target.value);
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
      <td>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select value={meetType} onChange={handleChange}>
            <MenuItem value={0}>검수중</MenuItem>
            <MenuItem value={1}>승인완료</MenuItem>
            <MenuItem value={2}>거절</MenuItem>
          </Select>
        </FormControl>
      </td>
    </tr>
  );
};
export default AdminMeeting;
