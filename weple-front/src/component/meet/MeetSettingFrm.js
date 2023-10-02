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
                <label htmlFor="meetTitleFrm">모임 이름</label>
                <div className="jwInput" id="jwInput">
                    <JwInput
                        type="text"
                        data={meetTitle}
                        setData={setMeetTitle}
                        content="meetTitleFrm"
                    />
                </div>
            </div>
            <div className="meetThumbnailFrm">
                <label>썸네일</label>
                {/* accept = image/* : 이미지파일만 올릴수 있도록 */}
                <input
                    className="meetThumbnail-input"
                    type="file"
                    id="meetThumbnail"
                    accept="image/*"
                    // 파일선택을 바꿀때 이벤트 발생
                    //썸네일 미리보기 함수
                ></input>
                
            </div>
            <div className="meetDateFrm">
                <label>모임날짜</label>
                <input type="datetime-local"></input>
            </div>
            <div className="meetPlaceFrm">모임위치</div>
            <div className="meetMemberLimitFrm">
                <label>모임참여인원</label>
                <input type="number" min="1" max="100"></input>
            </div>
            <div className="meetContentFrm">모임설명에디터</div>
            <div className="meetMaterialsFrm">준비물</div>
            <div className="meet-btn-box">버튼박스</div>

        </div>
    );


}

export default MeetSettingFrm;