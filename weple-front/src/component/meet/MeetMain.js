import { Link, Route, Routes } from "react-router-dom";
import "./meetDefault.css"
import { JwButton1 } from "./meetUtil/JwButton";
import MeetSettingFrm from "./MeetSettingFrm";
import MeetCreate from "./MeetCreate";
import AfterMeet from "./AfterMeet";

const MeetMain = () => {
    return (
        <div className="meet-all-wrap">
            
            <Link to="/meet">모임메인link</Link>
            <Link to="/meet/meetCreate">임시모임생성Frmlink</Link>
            <Link to="/meet/meetSettingFrm">임시모임생성link</Link>
            <Link to="/meet/afterMeet">가입후 모임</Link>
            <Link to="#">내가 계설한 그룹 신청 인원</Link>
            <Routes>
                <Route path="meetSettingFrm" element={<MeetSettingFrm />} />
                <Route path="meetCreate" element={<MeetCreate/>}></Route>
                <Route path="afterMeet/*" element={<AfterMeet />}/>
                
            </Routes>
        </div>

    );
}

export default MeetMain;