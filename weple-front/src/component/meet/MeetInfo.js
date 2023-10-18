import { useState } from "react";
import "./afterMeet.css";
import "./meetInfo.css";
import { useEffect } from "react";
import Review from "../review/Review";
import { Button1 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MeetInfo = (props) => {
  //console.log("info", props)
  const [meet, setMeet] = useState({});
  // console.log("info1", meet);
  // console.log("info2", props);
  const isLogin = props.isLogin;
  const [loginMember, setLoginMember] = useState(null);
  const meetCaptain = props.meetCaptain;
  //모임에 이미 가입한 상태인지 알아보는 변수
  const [isMeetMember, setIsMeetMember] = useState(null);
  // const [meetJoinWaiting, setMeetJoinWaiting] = useState(null);
  const navigate = useNavigate();
  // console.log("모임", meet);
  const [meetPrepareList, setMeetPrepareList] = useState([]);

  useEffect(() => {
    // console.log("useEffect isMeetMember  작동");
    setMeet(props.myMeet);
    if (props.myMeet.meetPrepare) {
      setMeetPrepareList(props.myMeet.meetPrepare.split("/"));
    }
    if (isLogin) {
      //로그인한 상태라면
      //서버에서 로그인한 회원정보 가져오기
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setLoginMember(res.data);
        })
        .catch((res) => {});

      //로그인이 되어있다면 로그인멤버가 모임멤버인지 조회해오기
      //모임멤버라면 해당 follower 리턴 아직 멤버가 아니라면 null 리턴
      axios
        .post("/meet/isMeetMember", meet, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log("isMeetMember res.data : ", res.data);
          setIsMeetMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });

      //가입 대기 상태라면 모임가입 버튼 비활성화하도록 db에서 가입상태 가져오기
    }
  }, [props]);
  // console.log(meetPrepareList);
  // console.log(isLogin);
  // console.log("모임 : ", meet);
  // console.log("모임 번호 : ", meet.meetNo);
  // console.log("팔로워 isMeetMember :  ", isMeetMember);
  // console.log("팔로워 객체안 : ", isMeetMember.meetNo);
  // console.log("팔로워 스테이터스 : ", isMeetMember.followerStatus);

  //로그인 이후 모임가입하기 버튼 클릭시 작동하는 함수
  const meetJoin = () => {
    const token = window.localStorage.getItem("token");

    axios
      .post("/meet/meetJoin", meet, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          Swal.fire("가입신청 완료");
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const deleteMember = () => {
    Swal.fire({
      text: "모임에서 탈퇴 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios
          .post("/meet/deleteMember", isMeetMember)
          .then((res) => {
            console.log(res.data);
            Swal.fire("탈퇴 완료하였습니다.", "회원탈퇴 완료", "success");
            navigate("/");
          })
          .catch((res) => {
            console.log(res.response.data);
          });
      }
    });
  };

  //모임장이 모임수정 버튼 클릭시
  const meetModify = () => {
    // console.log("meetModyfy버튼 클릭시 전달되는 meet : ", meet);
    navigate("/meet/meetModify", { state: { meet: meet } });
  };
  // console.log("리턴바로위 isMeetMember : ", isMeetMember);
  return (
    <div className="meetInfo-all-wrap">
      <Review
        // 조회가 안됨
        meetNo={meet.meetNo}
        isMeetMember={isMeetMember}
        reviewStar={meet.reviewStar}
        reviewCount={meet.reviewCount}
      />
      <div className="meetInfo-content">
        <div className="meetInfo-content-area">
          <div className="meetInfo-content-title">모임소개</div>
          <div
            className="meetViewContentD"
            dangerouslySetInnerHTML={{ __html: meet ? meet.meetContentD : "" }}
          ></div>
        </div>
        <div className="meetInfo-content-area meetInfo-meetAddr-wrap">
          <div className="meetInfo-content-title">모임 장소</div>
          <div className="">
            <div>{meet.meetLatitude}</div>
            <div>{meet.meetLongitude}</div>
            <Kakao
              meetLatitude={meet.meetLatitude}
              meetLongitude={meet.meetLongitude}
            />
            <div>
              <div className="meetInfo-meetAddress1">{meet.meetAddress1}</div>
              <div className="meetInfo-meetAddress2">{meet.meetAddress2}</div>
            </div>
          </div>
        </div>
        <div className="meetInfo-content-area">
          <div className="meetInfo-content-title">준비물</div>
          <div className="meetInfo-meetPrepareList">
            {meetPrepareList.map((meetPrepare, index) => {
              return (
                <span
                  key={"meetPrepare" + index}
                  className="meetInfo-meetPrepare"
                >
                  {meetPrepare}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="meetJoin-btn-zone">
        {/* 버튼이 보이는 조건: 로그인이 되어있고 / 아직 모임 가입을 하지 않는 경우 */}
        {isLogin ? (
          meetCaptain && loginMember ? ( //객체 가져와져있는지부터 확인
            meetCaptain.memberNo === loginMember.memberNo ? ( //로그인한 멤버가 모임장이라면?
              <div onClick={meetModify}>모임장이면 출력안함</div>
            ) : isMeetMember ? ( //객체 가져와져있는지부터 확인
              // <Button1 text="모임탈퇴하기" clickEvent={deleteMember} />
              // isMesetMember가 있을때"
              isMeetMember?.followerStatus === 1 ? ( //현재 가입이 승인되어있는가?
                //현재 followerStatus == 1 일때
                <div>
                  <div>{isMeetMember?.followerStatus}</div>
                  <Button1 text="모임탈퇴하기" clickEvent={deleteMember} />
                </div>
              ) : (
                //현재 followerStatus == 0 일때
                <div>가입승인 대기중</div> //div로 가입 승인대기중 띄워주기 또는 공백 처리
              )
            ) : (
              //isMeetMember가 비어있을때
              <div>
                <div>{isMeetMember?.followerStatus}</div>
                <Button1 text="모임가입하기" clickEvent={meetJoin} />
              </div>
            )
          ) : (
            ""
          )
        ) : (
          "로그아웃 상태" //로그아웃 상태일때 공백
        )}
      </div>
    </div>
  );
};

const { kakao } = window;
const Kakao = (props) => {
  const meetLatitude = props.meetLatitude;
  const meetLongitude = props.meetLongitude;
  // console.log("카카오맵 위도 : ", meetLatitude);
  // console.log("카카오맵 경도 : ", meetLongitude);
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "300px",
      }}
    ></div>
  );
};
export default MeetInfo;
