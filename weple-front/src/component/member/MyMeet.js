import axios from "axios";
import { useEffect, useState } from "react";
import { Button2 } from "../util/Button";
import { useNavigate } from "react-router-dom";

const MyMeet = (props) => {
  const memberId = props.memberId;
  const memberNo = props.memberNo;
  const memberGrade = props.memberGrade;
  const [myMeetJoinedList, setMyMeetJoinedList] = useState([]);
  const [myMeetList, setMyMeetList] = useState([]);

  const navigate = useNavigate();

  const meetCreateBtn = () => {
    navigate("/meet/meetCreate");
  }

  useEffect(() => {
    axios
      .get("/member/meetJoined/" + memberNo)
      .then((res) => {
        setMyMeetJoinedList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });

    axios
      .get("/member/myMeet/" + memberId)
      .then((res) => {
        setMyMeetList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [memberId]);

  return (
    <div className="myMeet-wrap">
      <div className="profile-sub-content">
        <div className="myMeet-content">
          <div className="myMeet-content-mine">
            <div className="myMeet-content-title">
              <img src="/img/bar.png" />
              내가 개설한 모임
            </div>
            {/* 멤버등급이 블랙리스트면 모임개설버튼 비활성화 */}
            {memberGrade < 2 ? (<Button2 text="모임개설" clickEvent={meetCreateBtn}></Button2>) : ("")}
          </div>
          <div className="myMeet-content-item">
            {myMeetList == "" ? (
              <div className="noMeet">
                개설한 모임이 없습니다.<br></br>모임을 개설해보세요.
              </div>
            ) : (
              myMeetList.map((myMeet, index) => {
                return <MyMeetItem key={"myMeet" + index} myMeet={myMeet} />;
              })
            )}
          </div>
        </div>
        <div className="myMeet-content">
          <div className="myMeet-content-title">
            <img src="/img/bar.png" />
            내가 가입한 모임
          </div>
          <div className="myMeet-content-item">
            {myMeetJoinedList == "" ? (
              <div className="noMeet">
                가입한 모임이 없습니다.<br></br>모임에 가입해보세요.
              </div>
            ) : (
              myMeetJoinedList.map((myMeetJoined, index) => {
                return (
                  <MyMeetJoinedItem
                    key={"myMeetJoined" + index}
                    myMeetJoined={myMeetJoined}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyMeetItem = (props) => {
  const myMeet = props.myMeet;
  return (
    <div className="myMeetJoined-item">
      <div className="myMeetJoined-img">
        {myMeet.meetThumbNail === null ? (
          <img src="/img/testImg_01.png" />
        ) : (
          <img src={"/meet/" + myMeet.meetThumbNail} />
        )}
      </div>
      <div className="myMeetJoined-info">
        <div className="myMeetJoined-title">{myMeet.meetTitle}</div>
        <div>
          <div className="myMeetJoined-captain">
            <img src="/img/captain.png" />
            {myMeet.meetCaptain}
          </div>
          <div className="myMeetJoined-total">
            <img src="/img/meetTotal.png" />
            {myMeet.meetTotal - myMeet.meetMargin}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyMeetJoinedItem = (props) => {
  const myMeetJoined = props.myMeetJoined;
  return (
    <div className="myMeetJoined-item">
      <div className="myMeetJoined-img">
        {myMeetJoined.meetThumbNail === null ? (
          <img src="/img/testImg_01.png" />
        ) : (
          <img src={"/meet/" + myMeetJoined.meetThumbNail} />
        )}
      </div>
      <div className="myMeetJoined-info">
        <div className="myMeetJoined-title">{myMeetJoined.meetTitle}</div>
        <div>
          <div className="myMeetJoined-captain">
            <img src="/img/captain.png" />
            {myMeetJoined.meetCaptain}
          </div>
          <div className="myMeetJoined-total">
            <img src="/img/meetTotal.png" />
            {myMeetJoined.meetTotal - myMeetJoined.meetMargin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMeet;
