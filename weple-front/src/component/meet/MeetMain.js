import { Link, Route, Routes } from "react-router-dom";
import "./meetDefault.css"
import { JwButton1 } from "./meetUtil/JwButton";
import MeetCreateFrm from "./MeetCreateFrm";

const MeetMain = () => {
    return (
        <div className="meet-all-wrap">
            <div>모임메인</div>
            <Link to="/meet">모임메인link</Link>
            <Link to="/meet/meetCreateFrm">임시모임생성link</Link>
            <Routes>
                <Route path="/meetCreateFrm" element={<MeetCreateFrm />} />
            </Routes>
        </div>

    );
}

export default MeetMain;