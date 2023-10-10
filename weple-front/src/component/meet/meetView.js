import { useLocation } from "react-router";
import "./meetView.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button1, Button2, Button3 } from "../util/Button";
const MeetView = () => {

    const location = useLocation();
    const meetNo = location.state.meetNo;
    const [meet, setMeet] = useState({});
    console.log(meetNo);
    // 서버에서 axios로 상세보기 meet정보 가져오기

    useEffect(() => {
        axios
            .get("/meet/meetView/" + meetNo)
            .then((res) => {
                console.log(res.data);
                setMeet(res.data);
            })
            .catch((res) => {
                // console.log(res.response.status);
            })

    }, []);

    return (
        <div className="meetView-wrap">
            <div className="meetViewTop">
                <div className="meetThumNail-box">
                    <img src={meet.meetThumbNail}></img>
                </div>
                <div className="meetMainInfo-area">
                    <div className="meetView-meetTitle">
                        {meet.meetTitle}
                    </div>
                    <div className="meetView-meetContentS">
                        {meet.meetContentS}
                    </div>
                    <div className="">
                        <span>인원 : </span>
                        <span>{meet.meetTotal - meet.meetMargin}</span>
                        <span>/</span>
                        <span>{meet.meetTotal}명</span>
                    </div>
                    <div>
                        <span>호스트 : </span>
                        <span>{meet.meetCaptain}</span>
                    </div>
                    <div className="meetView-like-zone">
                        <span className="material-icons MeetList-like">favorite</span>
                    </div>
                </div >
            </div>
            <div className="meetView-feedPreView-area">피드 미리보기</div>
            <div className="meetView-meetContentD"
                dangerouslySetInnerHTML={{ __html: meet.meetContentD }}
            ></div>
            <div>모임 지도</div>
            <div>준비물</div>
            <div>모임멤버미리보기</div>
            <div>추천모임</div>
            <div className="meetJoin-btn-box">
                <Button1 text="가입신청" /></div>
        </div>
    );
}

export default MeetView;