import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import "./admin.css";
import axios from "axios";
import { FormControl, Select } from "@mui/material";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import Input from "../util/InputFrm";
import { Button1 } from "../util/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    axios
      .get("/admin/memberList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setMemberList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  return (
    <div className="admin-member-wrap">
      <div className="admin-member-top">
        <div className="admin-menu-title">
          <h1>회원 목록</h1>
        </div>
        <div className="admin-member-search-wrap">
          <div className="admin-member-search-input">
            <Input type="text" data={memberId} setData={setMemberId} content="memberId" placeholder="아이디를 입력해주세요" />
          </div>
          <div className="admin-member-search-button">
            <Button1 text="검색" />
          </div>
        </div>
        <div className="admin-member-tbl-box">
          <table>
            <thead>
              <tr>
                <td width={"20%"}>아이디</td>
                <td width={"20%"}>이름</td>
                <td width={"35%"}>이메일</td>
                <td width={"25%"}>등급</td>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member, index) => {
                return <MemberItem key={"member" + index} member={member} />;
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
const MemberItem = (props) => {
  const member = props.member;
  const [memberGrade, setMemberGrade] = useState(member.memberGrade);

  const handleChange = (event) => {
    const obj = { memberNo: member.memberNo, memberGrade: event.target.value };

    axios
      .post("/admin/changeMemberGrade", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setMemberGrade(event.target.value);
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
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberEmail}</td>
      <td>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select value={memberGrade} onChange={handleChange}>
            <MenuItem value={0}>관리자</MenuItem>
            <MenuItem value={1}>정회원</MenuItem>
            <MenuItem value={2}>블랙리스트</MenuItem>
          </Select>
        </FormControl>
      </td>
    </tr>
  );
};


export default AdminMember;
