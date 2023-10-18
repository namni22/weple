import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import "./admin.css";
import axios from "axios";
import { FormControl, Select } from "@mui/material";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import Input from "../util/InputFrm";
import { Button1 } from "../util/Button";
import { useNavigate } from "react-router-dom";


const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  const [memberId, setMemberId] = useState("");
  const [confirmedMemberId, setConfirmedMemberId] = useState("");

  useEffect(() => {
    if (memberId === "") {
      console.log("first useEffect reqPage : " + reqPage);
      axios
        .get("/admin/memberList/" + reqPage)
        .then((res) => {
          console.log("admin/memberList : " + res.data.list);
          setMemberList(res.data.list);
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [reqPage]);

  useEffect(() => {
    if (memberId !== "") {
      console.log("second useEffect memberId : " + memberId + ", reqPage : " + reqPage);
      axios
        .get("/admin/searchId/" + memberId + "/" + reqPage)
        .then((res) => {
          console.log("admin/searchId : " + res.data.list);
          setMemberList(res.data.list);
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [confirmedMemberId, reqPage])


  const onSearch = (e) => {
    const memberIdInputValue = document.querySelector("#memberId");
    setReqPage(1);
    setConfirmedMemberId(memberIdInputValue.value);
  }

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
            <Button1 text="검색" clickEvent={onSearch} />
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
            setData={setMemberList}
          />
        </div>
      </div>
    </div>
  );
};

const MemberItem = (props) => {
  const member = props.member;
  const [memberGrade, setMemberGrade] = useState(member.memberGrade);
  const [printOption, setPrintOption] = useState("");
  console.log("" + printOption)
  //const options = [{ value: 0, name: "관리자" }, { value: 1, namee: "정회원" }, { value: 2, value: "블랙리스트" }];
  const handleChange = (event) => {
    //const obj = { memberNo: member.memberNo, memberGrade: event.target.value };
    // const token = window.localStorage.getItem("token");
    // axios
    //   .post("/admin/changeMemberGrade", obj, {
    //     headers: {
    //       Authorization: "Bearer" + token,
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data === 1) {
    //       setMemberGrade(event.target.value);
    //     } else {
    //       Swal.fire("변경 중 문제가 발생했습니다.");
    //     }
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  };
  const printOptions = () => {
    if (memberGrade === 0) {
      setPrintOption("관리자")
    } else if (memberGrade === 1) {
      setPrintOption("정회원")
    } else if (memberGrade === 2) {
      setPrintOption("블랙리스트")
    }
  }
  printOptions();
  return (
    <tr>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberEmail}</td>
      <td>
        <select>

          {/* {member.memberGrade.map((memberGrade, index) => {

            <option value={memberGrade} key={options.value}>
              {options.name}
            </option>
          })} */}

        </select>

      </td>
    </tr>
  );
};


export default AdminMember;
