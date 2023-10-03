import { Link, Route, Routes } from "react-router-dom";
import "./meetDefault.css"
import { JwButton1 } from "./meetUtil/JwButton";
import MeetSettingFrm from "./MeetSettingFrm";
import MeetCreate from "./MeetCreate";
import MeetList from "./MeetList";

const MeetMain = () => {
    return (
        <div className="meet-all-wrap">
            <div>모임메인</div>
            <Link to="/meet">모임메인link</Link>
            <Link to="/meet/meetCreate">임시모임생성Frmlink</Link>
            <Link to="/meet/meetSettingFrm">임시모임생성link</Link>
            <Link to="/meet/meetList">모임리스트</Link>

            <Routes>
                <Route path="/meetSettingFrm" element={<MeetSettingFrm />} />
                <Route path="/meetCreate" element={<MeetCreate />}></Route>
                <Route path="/meetList" element={<MeetList />}></Route>
            </Routes>
        </div>

    );
}

export default MeetMain;