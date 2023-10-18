import axios from "axios";

const MyMeet = (props) => {
  const memberId = props.memberId;
  const memberNo = props.memberNo;

  axios
    .get("/member/meetJoined/" + memberNo)
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log(res.response.status);
    });
  return (
    <div className="myMeet-wrap">
      <div className="profile-sub-content">
        <div className="myMeet-content">모임 리스트</div>
      </div>
    </div>
  );
};

export default MyMeet;
