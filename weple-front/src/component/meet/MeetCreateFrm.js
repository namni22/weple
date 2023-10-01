import "./meetCreateFrm.css";
import JwInput from "./meetUtil/JwInputFrm";
const MeetCreateFrm = () => {
    return (
        <div className="meetCreateFrm-wrap">
            <div className="meetCategoriFrm">카테고리</div>
            <div className="meetTitleFrm">
                <span>제목</span>
                <div className="jwInput">
                    <JwInput/>
                </div>
            </div>
            <div className="meetThumbnailFrm">썸네일</div>
            <div className="meetDateFrm">모임날짜</div>
            <div className="meetPlaceFrm">모임위치</div>
            <div className="meetMemberLimitFrm">모임참여인원</div>
            <div className="meetContentFrm">모임설명에디터</div>
            <div className="meetMaterialsFrm">준비물</div>
            <div className="meet-btn-box">버튼박스</div>

        </div>
    );


}

export default MeetCreateFrm;