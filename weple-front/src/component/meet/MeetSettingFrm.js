import "./meetSettingFrm.css";
import JwInput from "./meetUtil/JwInputFrm";
import { JwButton1 } from "../meet/meetUtil/JwButton";
import { Button1, Button2 } from "../util/Button";
import TextEditor from "../util/TextEditor";
import { useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const MeetSettingFrm = (props) => {
    // 모임만들 정보 선언
    const meetTitle = props.meetTitle;
    const setMeetTitle = props.setMeetTitle;
    const meetMaterials = props.meetMaterials;
    const setMeetMaterials = props.setMeetMaterials;
    const buttonEvent = props.buttonEvent;


    // 지도
    // const container = document.getElementById('map');//지도를 담을 영역의 dom 레퍼런스
    // const options ={
    //     center : new kakao.maps.LatLng(33.45, 126.57)
    // }
    // const map = new kakao.maps.Map(container, options);

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
                    <div id="map" style={{ width: '500px', height: '500px' }}>
                        <Kakao2></Kakao2>
                    </div>
                </div>
                <div className="meetMemberLimitFrm">
                    <label>모임참여인원</label>
                    <input type="number" min="1" max="100"></input>

                </div>
                <div className="meetContentFrm">
                    <label>모임설명</label>
                    <TextEditor

                    />



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
                            <Button2 text="추가"></Button2>
                        </div>
                        <div className="meetMaterials-wrap">
                            <div className="meetMaterials-one">준비물1</div>
                            <div className="meetMaterials-one">준비물2</div>
                            <div className="meetMaterials-one">준비물3</div>
                        </div>
                    </div>
                </div>
                <div className="meet-btn-box">
                    <Button1 text="모임생성" clickEvent={buttonEvent}></Button1>
                </div>

            </div>
        </div>
    );


}

const { kakao } = window;
const Kakao2 = () => {
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.566826, 126.9786567), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }, [])
    return (
        <div id="map" style={{
            width: "500px",
            height: "500px"
        }}></div>
    )
}




export default MeetSettingFrm;