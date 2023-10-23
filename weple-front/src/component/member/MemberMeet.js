import axios from "axios";
import MyMeet from "./MyMeet";
import { useEffect, useState } from "react";

const MemberMeet = () => {
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});

  const memberId = member.memberId;
  const memberNo = member.memberNo;

  console.log(memberId);
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [token]);

  return <MyMeet memberId={memberId} memberNo={memberNo} />;
};

export default MemberMeet;
