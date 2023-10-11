import { Link, Route, Routes } from "react-router-dom";
import "./afterMeet.css";
import MeetSettingFrm from "./MeetSettingFrm";
import MeetCreate from "./MeetCreate";
import { MeetList } from "./MeetList";
import { useState } from "react";
import Category from "../common/Category";
import MeetView from "./MeetView";

const MeetMain = () => {
  const [meetNavi, setMeetNavi] = useState([
    { url: "myMeet", text: "내가 개설한 모임", active: false },
    { url: "currentMeet", text: "참여하는 모임", active: false },
    { url: "endMeet", text: "종료된 모임", active: false },
  ]);
  return (
    <div className="meet-all-wrap">
      <Routes>
        <Route path="/meetSettingFrm" element={<MeetSettingFrm />} />
        <Route path="/meetCreate" element={<MeetCreate />}></Route>
        <Route path="meetList" element={<MeetList />}></Route>
        <Route path="category" element={<Category />} />
        <Route path="meetSettingFrm" element={<MeetSettingFrm />} />
        <Route path="meetCreate" element={<MeetCreate />}></Route>
        <Route path="meetList/afterMeet/*" element={<MeetView />} />
      </Routes>
    </div>
  );
};

export default MeetMain;
