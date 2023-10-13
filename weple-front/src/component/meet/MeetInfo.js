import { useState } from "react";
import "./afterMeet.css";
import "./meetInfo.css";
import { useEffect } from "react";
import Review from "../review/Review";
import { Button1 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";

const MeetInfo = (props) => {
  const myMeet = props.myMeet;
  const isLogin = props.isLogin;

  const meetPrepareList = myMeet.meetPrepare.split("/");


  //로그인 이후 모임가입하기 버튼 클릭시 작동하는 함수
  const meetJoin = () => {
    const token = window.localStorage.getItem("token");

    axios
      .post("/meet/meetJoin", myMeet, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          Swal.fire("가입신청 완료")
        }

      })
      .catch((res) => {
        console.log(res.response.status);

      })
  }

  return (
    <div className="meetInfo-all-wrap">
      <Review meetNo={102} />
      <div className="meetInfo-content">
        <div className="meetViewContentD-area">
          <div className="meetViewContentD-title">모임소개</div>
          <div
            className="meetViewContentD"
            dangerouslySetInnerHTML={{ __html: myMeet.meetContentD }}
          >
          </div>
        </div>

        <Kakao />
        <div className="meetViewPrepare-area">
          <div>준비물</div>

          {meetPrepareList.map((meetPrepare, index) => {
            return (
              <div key={"meetPrepare" + index}>{meetPrepare}</div>
            )
          })}
        </div>
      </div>
      <div className="meetJoin-btn-zone">
        {/* 버튼이 보이는 조건: 로그인이 되어있고 / 아직 모임 가입을 하지 않는 경우 */}
        <Button1 text="모임가입하기" clickEvent={meetJoin} />
      </div>
    </div>
  );
};

const { kakao } = window;
const Kakao = () => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
};
export default MeetInfo;
