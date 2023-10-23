import axios from "axios";
import { useEffect, useState } from "react";
import { Button2 } from "../util/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyMeet = (props) => {
  const member = props.member;
  const memberId = props.memberId;
  const memberNo = props.memberNo;
  const memberGrade = props.memberGrade;
  const memberMeet = props.memberMeet; //모임개설가능 수
  const [myMeetJoinedList, setMyMeetJoinedList] = useState([]);
  const [myMeetList, setMyMeetList] = useState([]);

  const navigate = useNavigate();

  const meetCreateBtn = () => {
    // console.log("모임개설 가능 수 : ", memberMeet);
    if (memberMeet > 0) {
      navigate("/meet/meetCreate");
    } else {
      Swal.fire({
        text: "모임 추가개설은 결제가 필요한 서비스 입니다.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "결제페이지로 이동",
        cancelButtonText: "취소",
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/mypage/payment")//부모컴포넌트가 같아서 member를 안줘도 이동
          }
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    }
  };

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
            {/* 멤버등급이 블랙리스트면 모임개설버튼 비활성화, 모임 개설가능 수가 0 이상일때 버튼활성화 */}
            {memberGrade < 2 ? (
              <Button2 text="모임개설" clickEvent={meetCreateBtn}></Button2>
            ) : (
              ""
            )}
          </div>
          <div className="myMeet-content-item">
            {myMeetList == "" ? (
              <div className="noMeet">
                개설한 모임이 없습니다.<br></br>모임을 개설해보세요.
              </div>
            ) : (
              myMeetList.map((myMeet, index) => {
                return <MyMeetItem key={"myMeet" + index}
                  myMeet={myMeet}
                  memberNo={memberNo}
                />;
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
  const memberNo = props.memberNo;

  const navigate = useNavigate();

  //상세보기로 이동하는 함수
  const moveToMeetView = (myMeet, memberNo) => {

    axios
      .get("/meet/selectOneMeet2/" + myMeet.meetNo + "/" + memberNo)
      .then((res) => {
        console.log(res.data);
        navigate("/meet/View", {
          state: { m: res.data },
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }

  return (
    //내가 개설한 모임으로이동
    // <Link to="/meet/view" state={{ m: myMeet }}></Link>
    <div className="myMeetJoined-item" onClick={() => {
      moveToMeetView(myMeet, memberNo);
    }}>
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
    //내가 가입한 모임으로 이동
    <Link to="/meet/view" state={{ m: myMeetJoined }}>
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
    </Link>
  );
};

export default MyMeet;
