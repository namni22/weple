import axios from "axios";
import React, { useEffect, useState } from "react";
import "./alarm.css";

const Alarm = (props) => {
  const member = props.member;
  const [memberId, setMemberId] = useState(member.memberId);
  const [memberGrade, setMemberGrade] = useState(member.memberGrade);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    // 회원 등급 가져오기
    console.log(memberId);
    console.log(memberGrade);

    axios
      .get("/member/getMemberGrade/" + memberId)
      .then((res) => {
        console.log(res.data);
        const newGrade = res.data;
        if (memberGrade !== newGrade) {
          // 등급 바뀌었을 때 알람 추가
          const message =
            newGrade === 0
              ? "관리자"
              : newGrade === 2
              ? "블랙리스트"
              : "정회원";
          setAlarms([...alarms, "[" + message + "]"]);
        }
        setMemberGrade(newGrade);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [memberId, memberGrade, alarms]);

  return (
    <div className="alarm-wrap">
      <div className="myPage-title">
        <h3>알림</h3>
      </div>
      <div className="alarm-content">
        <div className="alarm-content-item">
          <AlarmItem alarms={Array.from(alarms)} />
        </div>
      </div>
    </div>
  );
};

const AlarmItem = ({ alarms }) => {
  return (
    <div className="alarm-item">
      {alarms
        .slice(0)
        .reverse()
        .map((alarm, index) => {
          return (
            <div className="alarm-one-item" key={`alarm-${index}`}>
              <div className="alarm-item-title">등급변경 알림</div>
              <div className="alarm-item-content">
                회원님의 등급이 <span className="grade">{alarm}</span>(으)로
                변경되었습니다.
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Alarm;
