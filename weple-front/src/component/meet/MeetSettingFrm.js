import "./meetSettingFrm.css";
import JwInput from "./meetUtil/JwInputFrm";
import { JwButton1 } from "../meet/meetUtil/JwButton";
import { Button1, Button2 } from "../util/Button";
import TextEditor from "../util/TextEditor";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Input from "../util/InputFrm";

const MeetSettingFrm = (props) => {
    // 모임만들 정보 선언 //create에서 받음 // update에서 받을예정
    const meetTitle = props.meetTitle;
    const setMeetTitle = props.setMeetTitle;
    // const meetMaterials = props.meetMaterials;
    // const setMeetMaterials = props.setMeetMaterials;
    const meetContentS = props.meetContentS;
    const setMeetContentS = props.setMeetContentS;
    const meetContentD = props.meetContentD;
    const setMeetContentD = props.setMeetContentD;
    const meetDate = props.meetDate;
    const setMeetDate = props.setMeetDate;
    const meetTotal = props.meetTotal;
    const setMeetTotal = props.setMeetTotal;

    const meetThumbnail = props.meetThumbnail;
    const setMeetThumbnail = props.setMeetThumbnail;

    //썸네일 미리보기용
    const meetThumbnailPreview = props.meetThumbnailPreview;
    const setMeetThumbnailPreview = props.setMeetThumbnailPreview;

    // 준비물 리스트 추가용
    const meetPrepare = props.meetPrepare
    const setMeetPrepare = props.setMeetPrepare
    const meetPrepareList = props.meetPrepareList;
    const setMeetPrepareList = props.setMeetPrepareList;

    const buttonEvent = props.buttonEvent;


    // 지도
    // const container = document.getElementById('map');//지도를 담을 영역의 dom 레퍼런스
    // const options ={
    //     center : new kakao.maps.LatLng(33.45, 126.57)
    // }
    // const map = new kakao.maps.Map(container, options);

    //   썸네일 미리보기 함수
    const thumbnailChange = (e) => {
        const files = e.currentTarget.files;
        if (files.length !== 0 && files[0] != 0) {
            // 파일이 들어왔을때
            setMeetThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일객체 저장
            //화면에 썸네일 미리보기
            const reader = new FileReader(); //객체만들고
            reader.readAsDataURL(files[0]); //파일 읽어와
            reader.onloadend = () => {
                setMeetThumbnailPreview(reader.result);
                console.log("썸네일 바꼇을때 : " + meetThumbnailPreview);
            };
        } else {
            // 파일이 취소됐을때
            setMeetThumbnail({}); //썸내일 빈객체로
            setMeetThumbnailPreview(null); //보드이미지 빈문자열로 //빈문자열에서 null로 바꿈
        }
    };

    //모임 인원 변경 함수
    const changeMeetTotal = (e) => {
        console.log(e.currentTarget.value);
        setMeetTotal(e.currentTarget.value)
    }

    // 준비물 추가버튼 눌럿을때 작동하는 함수
    const meetPrepareAdd = () => {
        if (meetPrepare !== "") {//준비물 input이 빈칸이 아닐때만 추가
            const meetPrepare2 = document.querySelector("#meetPrepare").value
            setMeetPrepare(meetPrepare2)
            console.log("추가한 준비물 : " + meetPrepare2);
            const newArr = [...meetPrepareList];//깊은복사해서
            newArr.push(meetPrepare2);
            setMeetPrepareList(newArr);
            setMeetPrepare("");//준비물 input 비워주기
            console.log(meetPrepareList);

        }

    };

    return (
        <div className="meetSettingFrm-main-wrap">

            <div className="meetSettingFrm-wrap">
                <div className="meetCategoriFrm">카테고리</div>
                <div className="meetTitleFrm">
                    <label htmlFor="meetTitleFrm">모임 이름</label>
                    <div className="jwInput" id="jwInput">
                        <Input
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
                            onChange={thumbnailChange}
                        ></input>



                        <div className="meetThumbnailPreview">
                            {/* <img src={meetThumbnail2}></img> */}
                            {meetThumbnailPreview === null ? ( //""에서 null로 바꿈
                                // 기본이미지 넣어야함
                                <img src="/img/main_1.jpg"></img>
                            ) : (
                                <img src={meetThumbnailPreview}></img>
                            )}
                        </div>

                    </div>

                </div>
                <div className="meetDateFrm">
                    <label>모임날짜</label>
                    <Input
                        type="date"
                        data={meetDate}
                        setData={setMeetDate}
                    />
                </div>
                <div className="meetPlaceFrm">
                    <label>모임위치</label>
                    <div id="map" style={{ width: '500px', height: '500px' }}>
                        <Kakao2></Kakao2>
                    </div>
                </div>
                <div className="meetMemberLimitFrm">
                    <label>모임참여인원</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        onChange={changeMeetTotal}

                    >


                    </input>

                </div>
                <div>
                    <label>모임 한줄 설명</label>
                    <Input
                        type="text"
                        data={meetContentS}
                        setData={setMeetContentS}
                    // content=""
                    />
                </div>
                <div className="meetContentFrm">
                    <label>모임설명</label>
                    <div className="meetContentD-box">
                        <TextEditor
                            data={meetContentD}
                            setData={setMeetContentD}
                            url="/meet/meetContentDImg"
                        />

                    </div>



                </div>
                <div className="meetMaterialsFrm">
                    <label>준비물</label>
                    <div className="meetMaterials-content-wrap">
                        <div className="meetMaterials-input-box">
                            <Input
                                type="text"
                                data={meetPrepare}
                                setData={setMeetPrepare}
                                content="meetPrepare"
                            ></Input>
                        </div>
                        <div className="meetMaterialsInsert-btn-box">
                            <Button2 text="추가" clickEvent={meetPrepareAdd}></Button2>
                        </div>
                        <div className="meetMaterials-wrap">
                            <ul>
                                <li className="meetMaterials-one">준비물1</li>
                                <li className="meetMaterials-one">준비물2</li>
                                <li className="meetMaterials-one">준비물3</li>
                            </ul>
                            {meetPrepareList.map((meetPrepare, index) => {
                                return (
                                    <div key={"meetPrepare" + index} className="meetMaterials-one">{meetPrepare}</div>
                                )
                            })}

                        </div>
                    </div>
                </div>
                <div className="meet-btn-box">
                    <Button1 text="모임생성" clickEvent={buttonEvent}></Button1>
                </div>

            </div>
        </div >
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