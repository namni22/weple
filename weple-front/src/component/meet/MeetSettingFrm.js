import "./meetSettingFrm.css";
import JwInput from "./meetUtil/JwInputFrm";
import { JwButton1 } from "../meet/meetUtil/JwButton";

const MeetSettingFrm = (props) => {
    // 모임만들 정보 선언
    const meetTitle = props.meetTitle;
    const setMeetTitle = props.setMeetTitle;
    const meetMaterials = props.meetMaterials;
    const setMeetMaterials = props.setMeetMaterials;


    return (
        <div className="meetSettingFrm-main-wrap">

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
                <div>
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

            </div>
            <div className="meetDateFrm">
                <label>모임날짜</label>
                <input type="datetime-local"></input>
            </div>
            <div className="meetPlaceFrm">
                <label>모임위치</label>
                <div>주소입력 , 지도</div>
            </div>
            <div className="meetMemberLimitFrm">
                <label>모임참여인원</label>
                <input type="number" min="1" max="100"></input>

            </div>
            <div className="meetContentFrm">
                <label>모임설명</label>
                <textarea></textarea>
            </div>
            <div className="meetMaterialsFrm">
                <label>준비물</label>
                <div className="meetMaterials-content-wrap">
                    <div className="meetMaterials-input-box">
                        <JwInput
                            type="text"
                            data={meetMaterials}
                            setData={setMeetMaterials}
                            content="meetTitleFrm"
                        ></JwInput>
                    </div>
                    <div className="meetMaterialsInsert-btn-box">
                        <JwButton1 text="추가"></JwButton1>
                    </div>

                    <div className="meetMaterials-wrap">
                        <div className="meetMaterials-one">준비물1</div>
                        <div className="meetMaterials-one">준비물2</div>
                        <div className="meetMaterials-one">준비물3</div>
                    </div>
                </div>

            </div>
            <div className="meet-btn-box">
                <JwButton1 text="모임 생성"></JwButton1>
            </div>

        </div>
        </div>
    );


}

export default MeetSettingFrm;