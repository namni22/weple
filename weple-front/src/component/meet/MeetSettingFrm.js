import "./meetSettingFrm.css";
import JwInput from "./meetUtil/JwInputFrm";
const MeetSettingFrm = (props) => {
    // 모임만들 정보 선언
    const meetTitle = props.meetTitle;
    const setMeetTitle = props.setMeetTitle;
    
    
    return (
        <div className="meetSettingFrm-wrap">
            <div className="meetCategoriFrm">카테고리</div>
            <div className="meetTitleFrm">
                <label htmlFor="meetTitleFrm">제목</label>
                <div className="jwInput" id="jwInput">
                    <JwInput
                        type="text"
                        data={meetTitle}
                        setData={setMeetTitle}
                        content="meetTitleFrm" 
                    />
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

export default MeetSettingFrm;