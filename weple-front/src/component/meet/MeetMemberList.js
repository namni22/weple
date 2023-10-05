import { useState } from "react";
import "./afterMeet.css";
import { JwButton1, JwButton2, JwButton3 } from "./meetUtil/JwButton";
import { Button1, Button2, Button3 } from "../util/Button";

const MeetMemberList = () => {
  const [member, setMember] = useState([
    {
      img: "/img/testImg_01.png",
      memberId: "닉네임1",
    },
    {
      img: "/img/testImg_01.png",
      memberId: "닉네임2",
    },
    {
      img: "/img/testImg_01.png",
      memberId: "닉네임3",
    },
    {
      img: "/img/testImg_01.png",
      memberId: "닉네임4",
    },
  ]);
  return (
    <div className="meetMemberList-all-wrap">
      {member.map((member, index) => {
        return <MemberList key={"member" + index} member={member} />;
      })}
    </div>
  );
};
const MemberList = (props) => {
  const memberList = props.member;
  return (
    <>
      <table className="meetMemberList-wrap">
        <tbody>
          <tr>
            <td width="5%">
              <div className="meetMemberList-img">
                <img src={memberList.img} />
              </div>
            </td>
            <td width="60%">
              <div className="meetMemberList-name">{memberList.memberId}</div>
            </td>
            <td width="35%">
              <div className="meetMemberList-btn-wrap">
                <Button1 text={"호감도"} />
                <Button2 text={"신고"} />
                <Button3 text={"강퇴"} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/*
        <div className="meetMemberList-wrap">
            <div className="meetMemberList-img">
                <img src={memberList.img}/>
            </div>
            <div className="meetMemberList-name">{memberList.memberId}</div>
            <div className="meetMemberList-btn-wrap">
                <JwButton1 text={"호감도"} className="meetMemberList-btn"/>
                <JwButton2 text={"신고"} className="meetMemberList-btn"/>
                <JwButton3 text={"강퇴"} className="meetMemberList-btn"/>
            </div>
        </div>
         */}
    </>
  );
};
export default MeetMemberList;
