import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./afterMeet.css";
import MeetInfo from "./MeetInfo";
import MeetChat from "./MeetChat";
import { useState } from "react";
import MeetCalendar from "./MeetCalendar";
import MeetMemberList from "./MeetMemberList";
import { useEffect } from "react";

import EnrollMeetMember from "./EnrollMeetMember";
import axios from "axios";

const MeetView = (props) => {
    const isLogin = props.isLogin;

    const location = useLocation();
    const [myMeet, setMyMeet] = useState({});
    //state가 초기화되서 빈 myMeet가 MeetInfo로 전달되기 때문에 const로 모임 다시 선언
    const meet = location.state.m

    //모임장 id 전송 이후 DB에서 모임장 정보 불러오기
    const [meetCaptain, setMeetCaptain] = useState({});
    useEffect(() => {
        axios
            .post("/meet/selectOneMember", { memberId: location.state.m.meetCaptain })
            .then((res) => {
                console.log(res.data);
                setMeetCaptain(res.data);
            })
            .catch((res) => {
                console.log("catch : " + res.response.status);
            })
    }, [])

    useEffect(() => {
        setMyMeet(location.state.m);
    }, []);
    const [meetMenu, setMeetMenu] = useState([
        { url: "", text: "소개", active: true },
        { url: "meetChat", text: "글 작성", active: false },
        { url: "meetCalendar", text: "캘린더", active: false },
        { url: "meetList", text: "멤버목록", active: false },
        { url: "enrollMeetMember", text: "신청자목록", active: false },
    ]);
    // const [meetInfo, setMeetInfo] = useState("");
    return (
        <div className="afterMeet-all-wrap">
            <div className="feed-title">MY GROUP</div>
            <AfterMeetMain myMeet={myMeet} meetCaptain={meetCaptain} />
            <AfterMeetSubNavi meetMenu={meetMenu} setMeetMenu={setMeetMenu} />
            <Routes>
                <Route
                    path="enrollMeetMember"
                    element={<EnrollMeetMember myMeet={myMeet} />}
                />
                <Route path="meetChat" element={<MeetChat myMeet={myMeet} />} />
                <Route path="meetCalendar" element={<MeetCalendar />} />
                <Route path="meetList" element={<MeetMemberList myMeet={myMeet} />} />
                <Route path="*" element={<MeetInfo meet={meet} isLogin={isLogin} />} />
            </Routes>
        </div>
    );
};

const AfterMeetMain = (props) => {
    const myMeet = props.myMeet;
    const meetCaptain = props.meetCaptain;

    console.log(myMeet);
    return (
        <div className="afterMeet-main-wrap">
            <div className="afterMeet-main-thumbnail">
                <div className="afterMeet-thumbnail-img">
                    <img src={"/meet/" + myMeet.meetThumbNail}></img>
                </div>
            </div>
            <div className="afterMeet-main-info">
                <div className="afterMeet-info-host">
                    <div className="aferMeet-host-img">
                        {/* <img src="/img/testImg_01.png"></img> */}
                        {meetCaptain.memberImage ? (
                            <img src={"/member/" + meetCaptain.memberImage}></img>
                        ) : (
                            <img src="/img/testImg_01.png"></img>
                        )}
                    </div>
                    <div className="aferMeet-host-name">
                        <Link to="#">{myMeet.meetCaptain}</Link>
                    </div>
                    <div className="afer-host-like">
                        <span className="material-icons">favorite</span>
                    </div>
                </div>
                <div className="afterMeet-info-title">
                    <h3>{myMeet.meetTitle}</h3>
                </div>
                <div className="afterMeet-info-sub-content">
                    <p>{myMeet.meetContentS}</p>
                </div>
                <div className="afterMeet-member-count">
                    {myMeet.meetMargin}/{myMeet.meetTotal}명
                </div>
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
export default MeetView;
