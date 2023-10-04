import { useState } from "react";
import "./admin.css";
import Pagination from "./Pagination";
import { FormControl, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
const AdminMeeting = () => {
    const [meetingList, setMeetingList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [reqPage, setReqPage] = useState(1);


    return (
        <div className="admin-meeting-wrap">
            <div className="admin-meeting-top">
                <div className="admin-menu-title"><h1>모임 신청 내역</h1></div>
                <div className="admin-member-tbl-box">
                    <table>
                        <thead>
                            <tr>
                                <td width={"20%"}>모임장</td>
                                <td width={"20%"}>모임제목</td>
                                <td width={"35%"}>모집인원</td>
                                <td width={"25%"}>승인</td>
                            </tr>
                        </thead>
                        <tbody>
                            {meetingList.map((meeting, index) => {
                                return <MeetingItem key={"meeting" + index} meeting={meeting} />;
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



    )

};
const MeetingItem = (props) => {
    const meet = props.meet;
    const [meetType, setMeetType] = useState(meet.meetType);

    const handleChange = (event) => {
        const obj = { meetNo: meet.meetNo, meetType: event.target.value };
        const token = window.localStorage.getItem("token");
        axios
            .post("/member/changeType", obj, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
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
            <td>{meet.meetName}</td>
            <td>{meet.meetTitle}</td>
            <td>{meet.meetTotal}</td>
            <td>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <Select value={meetType} onChange={handleChange}>
                        <MenuItem value={0}>대기중</MenuItem>
                        <MenuItem value={1}>승인</MenuItem>
                        <MenuItem value={2}>거절</MenuItem>
                    </Select>
                </FormControl>
            </td>
        </tr>
    );
};
export default AdminMeeting;