import { Link } from "react-router-dom"
import "./afterMeet.css"

const AfterMeet =   ()=>{
    return (
        <div className="afterMeet-all-wrap">
            <div>모임 가입후 보여지는창</div>
            <AfterMeetMain/>
            <AfterMeetSubNavi />
        </div>
    )
}

const AfterMeetMain = ()=>{
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
                <div className="afterMeet-member-count">
                    0/40명
                </div>
            </div>           
        </div>
    )
}
const AfterMeetSubNavi = ()=>{
    return ( 
        <div>
            <ul>
                <li>소개</li>
                <li>채팅</li>
                <li>캘린더</li>
                <li>멤버 목록</li>
            </ul>
        </div>
    )
}
export default AfterMeet;