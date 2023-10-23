import { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import Input from "../util/InputFrm";
import { Button1 } from "../util/Button";


const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);

  const [memberId, setMemberId] = useState("");
  const [confirmedMemberId, setConfirmedMemberId] = useState("");

  useEffect(() => {
    if (memberId === "") {
      axios
        .get("/admin/memberList/" + reqPage)
        .then((res) => {

          setMemberList(res.data.list);
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          console.log(res);
        });
    }
    else {
      axios
        .get("/admin/searchId/" + memberId + "/" + reqPage)
        .then((res) => {

          setMemberList(res.data.list);
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          //console.log(res);
        });
    }
  }, [reqPage, confirmedMemberId]);


  const onSearch = (e) => {
    const memberIdInputValue = document.querySelector("#memberId");
    setReqPage(1);
    setConfirmedMemberId(memberIdInputValue.value);
    setMemberList([]);
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
  const memberNo = member.memberNo;

  //const options = [{ grade: 0, name: "관리자" }, { grade: 1, name: "정회원" }, { grade: 2, name: "블랙리스트" }];
  // index 0 : 관리자, 1 : 정회원, 2 : 블랙리스트
  const options = ["관리자", "정회원", "블랙리스트"];

  const clickChange = (event) => {
    setMemberGrade(event.target.value);
    //console.log(event.target.value);
    //console 먼저 찍고 set함수 작용
  };

  const clickConfirm = (event) => {
    const obj = { memberNo: memberNo, memberGrade: memberGrade };
    const token = window.localStorage.getItem("token");
    axios
      .post("/admin/changeMemberGrade", obj, {
        headers: {
          Authorization: "Bearer" + token,
        }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setMemberGrade(memberGrade);
          Swal.fire("변경 성공하셨습니다.")
        } else {
          Swal.fire("변경 중 문제가 발생했습니다.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });

  }



  return (
    <tr>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberEmail}</td>
      <td className="selectGrade">
        <select value={memberGrade} onChange={clickChange} >
          {options.map((option, index) => {
            return <option value={index} key={"option" + index}> {option} </option>
          })}
        </select>
        <Button1 text="변경" clickEvent={clickConfirm} />
      </td>
    </tr>
  );
};


export default AdminMember;
