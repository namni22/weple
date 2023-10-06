import { Link, Route, Routes } from "react-router-dom";
import "./afterMeet.css";
import { JwButton1 } from "./meetUtil/JwButton";
import MeetSettingFrm from "./MeetSettingFrm";
import MeetCreate from "./MeetCreate";
import MeetList from "./MeetList";

import AfterMeet from "./AfterMeet";
import { useState } from "react";
import MyMeetList from "./MyMeetList";

const MeetMain = () => {
  const [meetNavi, setMeetNavi] = useState([
    { url: "myMeet", text: "내가 개설한 모임", active: false },
    { url: "currentMeet", text: "참여하는 모임", active: false },
    { url: "endMeet", text: "종료된 모임", active: false },
  ]);
  return (
    <div className="meet-all-wrap">
      <div className="meet-navi">
        <MeetNavi meetNavi={meetNavi} setMeetNavi={setMeetNavi} />
      </div>
      {/*
            <Link to="/meet">모임메인link</Link>
            <Link to="/meet/meetCreate">임시모임생성Frmlink</Link>
            <Link to="/meet/meetSettingFrm">임시모임생성link</Link>
            <Link to="/meet/meetList">모임리스트</Link>
            
            <Link to="/meet/afterMeet">가입후 모임</Link>
            <Link to="#">내가 계설한 그룹 신청 인원</Link>
             */}
      <Routes>
        <Route path="/meetSettingFrm" element={<MeetSettingFrm />} />
        <Route path="/meetCreate" element={<MeetCreate />}></Route>
        <Route path="/meetList" element={<MeetList />}></Route>

        {/* <Routes> */}
        <Route path="meetSettingFrm" element={<MeetSettingFrm />} />
        <Route path="meetCreate" element={<MeetCreate />}></Route>
        {/* */}
        <Route path="myMeet/afterMeet/*" element={<AfterMeet />} />
        <Route path="myMeet" element={<MyMeetList />} />
      </Routes>
    </div>
  );
};

const MeetNavi = (props) => {
  const meetNavi = props.meetNavi;
  const setMeetNavi = props.setMeetNavi;
  const activeTab = (index) => {
    meetNavi.forEach((item) => {
      item.active = false;
    });
    meetNavi[index].active = true;
    setMeetNavi([...meetNavi]);
  };
  return (
    <div className="meet-navi">
      <ul>
        {meetNavi.map((meetNavi, index) => {
          return (
            <li key={"meetNavi" + index}>
              {meetNavi.active ? (
                <Link
                  to={meetNavi.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {meetNavi.text}
                </Link>
              ) : (
                <Link
                  to={meetNavi.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {meetNavi.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MeetMain;
