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
  const isMeetMember = props.isMeetMember;
  const setIsMeetMember = props.setIsMeetMember;
  //console.log("info", props)
  const [meet, setMeet] = useState({});
  // console.log("info1", meet);
  // console.log("info2", props);
  const isLogin = props.isLogin;
  const [loginMember, setLoginMember] = useState(null);
  const meetCaptain = props.meetCaptain;
  // //모임에 이미 가입한 상태인지 알아보는 변수
  // const [isMeetMember, setIsMeetMember] = useState(null);
  // const [meetJoinWaiting, setMeetJoinWaiting] = useState(null);
  const navigate = useNavigate();
  // console.log("모임", meet);
  const [meetPrepareList, setMeetPrepareList] = useState([]);

  useEffect(() => {
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
          // console.log(res.data);
          setLoginMember(res.data);
        })
        .catch((res) => { });
    }
  }, [props]);

  //로그아웃상태에서 모임가입 버튼클릭시 
  const loginSwal = () => {
    Swal.fire("로그인이 필요한 서비스 입니다.")
  }

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
        Swal.fire("가입신청 완료");
        //상세보기에 남아있고 렌더링 다시 하도록
        setIsMeetMember(res.data);
        navigate("/meet/View");
        // if (res.data === 1) {
        // }
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
        console.log(
          "탈퇴로 전달되는 이즈 맴버 : ",
          { meetNo: isMeetMember.meetNo },
          { memberList: isMeetMember }
        );
        axios
          .post("/meet/selfDeleteMember", isMeetMember)
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

  //모임장이 모임 삭제 버튼 클릭시
  const meetDelete = () => {
    Swal.fire({
      text: "정말 모임을 삭제하시겠습니까??",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("삭제시필요한 모임번호 : ", meet.meetNo);
        //삭제진행
        const token = window.localStorage.getItem("token");
        const meetNo = meet.meetNo
        axios
          .post("/meet/meetDelete", meet, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(("모임 삭제 ", res.data));
            Swal.fire("삭제완료")
            navigate("/")
          })
          .catch((res) => {
            console.log("모임삭제 캐치", res.response.status);
          });

      }
    });
  }

  // console.log("모임준비물 리스트 :", meetPrepareList, meetPrepareList.length);
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
          <div className="meetInfo-content-title">모임장소</div>
          <div className="meetInfo-map">
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
        {meetPrepareList[0] ? ( //준비물이 있으면 출력
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
        ) : (
          <div className="meetInfo-content-title">준비물</div>
        )}
      </div>
      {console.log("모임 타입 : ", meet.meetType)}
      <div className="meetJoin-btn-zone">
        {/* 버튼이 보이는 조건: 로그인이 되어있고 / 아직 모임 가입을 하지 않는 경우 */}
        {isLogin ? (
          meetCaptain && loginMember ? ( //객체 가져와져있는지부터 확인
            meetCaptain.memberNo === loginMember.memberNo ? ( //로그인한 멤버가 모임장이라면?
              meet.meetType === 1 ? (//모임 반려중이면 버튼 출력안함
                <div className="meetInfo-cap-btn-wrap">
                  <Button1 text={"수정하기"} clickEvent={meetModify} />
                  <Button1 text={"모임삭제"} clickEvent={meetDelete} />
                </div>
              ) : (
                ""
              )
            ) : isMeetMember ? ( //객체 가져와져있는지부터 확인
              // <Button1 text="모임탈퇴하기" clickEvent={deleteMember} />
              // isMesetMember가 있을때"

              isMeetMember?.followerStatus === 1 ? ( //현재 가입이 승인되어있는가?
                //현재 followerStatus == 1 일때
                <div>


                  <Button1 text="모임탈퇴하기" clickEvent={deleteMember} />
                </div>
              ) : (
                //현재 followerStatus == 0 일때
                <div className="meetJoinWait">가입승인 대기중</div> //div로 가입 승인대기중 띄워주기 또는 공백 처리
              )
            ) : //isMeetMember가 비어있을때
              loginMember.memberGrade < 2 ? (
                <div>
                  <Button1 text="모임가입하기" clickEvent={meetJoin} />
                </div>
              ) : (
                "" //블랙리스트일떄 가입버튼 비활성화
              )
          ) : (
            ""
          )
        ) : (
          <Button1 text="모임가입하기" clickEvent={loginSwal} /> //로그아웃 상태일때 공백
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
      center: new kakao.maps.LatLng(meetLatitude, meetLongitude), //지도의 중심좌표.
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
  }, [props]);
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
