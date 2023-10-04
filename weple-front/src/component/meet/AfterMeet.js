import { Link, Route, Routes } from "react-router-dom";
import "./afterMeet.css";
import MeetInfo from "./MeetInfo";
import MeetChat from "./MeetChat";
import { useState } from "react";
import MeetCalendar from "./MeetCalendar";
import MeetMemberList from "./MeetMemberList";
import { useEffect } from "react";

const AfterMeet = () => {
  const [meetMenu, setMeetMenu] = useState([
    { url: "info", text: "소개", active: true },
    { url: "meetChat", text: "글 작성", active: false },
    { url: "meetCalendar", text: "캘린더", active: false },
    { url: "meetList", text: "멤버목록", active: false },
  ]);
  return (
    <div className="afterMeet-all-wrap">
      <div className="feed-title">MY GROUB</div>
      <AfterMeetMain />
      <AfterMeetSubNavi meetMenu={meetMenu} setMeetMenu={setMeetMenu} />
      <Routes>
        <Route path="meetChat" element={<MeetChat />} />
        <Route path="meetCalendar" element={<MeetCalendar />} />
        <Route path="meetList" element={<MeetMemberList />} />
        <Route path="*" element={<MeetInfo />} />
      </Routes>
    </div>
  );
};

const AfterMeetMain = () => {
  return (
    <div className="afterMeet-main-wrap">
      <div className="afterMeet-main-thumbnail">
        <div className="afterMeet-thumbnail-img">
          <img src="/img/meetTestImg_01.png"></img>
        </div>
      </div>
      <div className="afterMeet-main-info">
        <div className="afterMeet-info-host">
          <div className="aferMeet-host-img">
            <img src="/img/testImg_01.png"></img>
          </div>
          <div className="aferMeet-host-name">
            <Link to="#">호스트이름</Link>
          </div>
          <div className="afer-host-like">
            <span className="material-icons">favorite</span>
          </div>
        </div>
        <div className="afterMeet-info-title">
          <h3>모임명</h3>
        </div>
        <div className="afterMeet-info-sub-content">
          <p>간단한 모임설명...</p>
        </div>
        <div className="afterMeet-member-count">0/40명</div>
      </div>
    </div>
  );
};
const AfterMeetSubNavi = (props) => {
  const meetMenu = props.meetMenu;
  const setMeetMenu = props.setMeetMenu;
  const activeTab = (index) => {
    meetMenu.forEach((item) => {
      item.active = false;
    });
    meetMenu[index].active = true;
    setMeetMenu([...meetMenu]);
  };
  return (
    <div className="afterMeet-sub-navi">
      <ul>
        {meetMenu.map((meetMenu, index) => {
          return (
            <li key={"meetMenu" + index}>
              {meetMenu.active ? (
                <Link
                  to={meetMenu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {meetMenu.text}
                </Link>
              ) : (
                <Link
                  to={meetMenu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {meetMenu.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AfterMeet;
