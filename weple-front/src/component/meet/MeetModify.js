import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import MeetSettingFrm from "./MeetSettingFrm";
import axios from "axios";
import Swal from "sweetalert2";

const MeetModify = () => {
    const location = useLocation();
    const meet = location.state.meet;


    const [meetTitle, setMeetTitle] = useState(meet.meetTitle);
    const [meetContentS, setMeetContentS] = useState(meet.meetContentS);
    const [meetContentD, setMeetContentD] = useState(meet.meetContentD);
    const [meetDate, setMeetDate] = useState(meet.meetDate);
    const [meetTotal, setMeetTotal] = useState(meet.meetTotal);
    const [meetMargin, setMeetMargin] = useState(meet.meetMargin);
    const [meetCategory, setMeetCategory] = useState(meet.meetCategory);
    const [meetAddress1, setMeetAddress1] = useState(meet.meetAddress1);
    const [meetAddress2, setMeetAddress2] = useState(meet.meetAddress2);
    const [meetLatitude, setMeetLatitude] = useState(meet.meetLatitude);
    const [meetLongitude, setMeetLongitude] = useState(meet.meetLongitude);
    const [meetCaptain, setMeetCaptain] = useState(meet.meetCaptain);
    // const [meetMaterials, setMeetMaterials] = useState("");

    //썸네일
    const [meetThumbnail, setMeetThumbnail] = useState(null);
    // 썸네일 미리보기
    const [meetThumbnailPreview, setMeetThumbnailPreview] = useState(meet.meetThumbNail);

    // 준비물 리스트 추가용
    const [meetPrepare, setMeetPrepare] = useState(meet.meetPrepare);
    const [meetPrepareList, setMeetPrepareList] = useState(meet.meetPrepareList);

    useEffect(() => {
        if (meetPrepare) {
            setMeetPrepareList(meetPrepare.split("/"));
        }
    }, [meet.meetPrepare])


    //수정완료 버튼 눌럿을때 동작할 함수
    const meetModifyBtn = () => {
        console.log("meet 수정전체", meet);

        console.log("수정완료버튼 눌럿을때");
        console.log("모임번호 : " + meet.meetNo);
        console.log("모임제목 : " + meetTitle);
        console.log("모임 날짜 : " + meetDate);
        console.log("모임한줄설명 : " + meetContentS);
        console.log("모임디테일설명 : " + meetContentD);
        console.log("모임인원 :" + meetTotal);
        console.log("썸네일 : ", meetThumbnail);
        console.log("썸네일 미리보기 : ", meetThumbnailPreview);
        console.log("준비물 : " + meetPrepareList);
        console.log("카테고리번호 : " + meetCategory);
        console.log("모임주소1  : " + meetAddress1);
        console.log("위도 : ", meetLatitude);
        console.log("경도 : ", meetLongitude);
        if (
            meetCategory !== 0 &&
            meetTitle !== "" &&
            meetDate !== "" &&
            meetTotal !== "" &&
            meetContentS !== "" &&
            // meetThumbnail !== null &&
            meetAddress1 !== ""
        ) {
            const form = new FormData();
            form.append("meetNo", meet.meetNo);
            form.append("meetTitle", meetTitle);
            form.append("meetDate", meetDate);
            form.append("meetContentS", meetContentS);
            form.append("meetContentD", meetContentD);
            form.append("meetTotal", meetTotal);
            form.append("meetThumbNail", meetThumbnail);
            form.append("meetThumbNailPreview", meetThumbnailPreview)
            form.append("meetPrepareList", meetPrepareList);
            form.append("meetCategory", meetCategory);
            form.append("meetAddress1", meetAddress1);
            form.append("meetAddress2", meetAddress2);
            form.append("meetLatitude", meetLatitude);
            form.append("meetLongitude", meetLongitude);
            //지도 추가자리
            console.log("meetCreate form : ", form);

            // 토큰선언자리
            const token = window.localStorage.getItem("token");

            axios
                .post("/meet/meetModify", form, {
                    headers: {
                        contentType: "multipart/form-data",
                        processData: false,
                        // 토큰자리
                        Authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    console.log("결과 : " + res.data);
                    Swal.fire("모임수정 완료");
                })
                .catch((res) => {
                    console.log(res.response.status);
                });
        } else {
            Swal.fire("입력값을 모두 입력 하세요");
        }

    }

    return (
        <div>
            <div>모임 수정</div>
            <MeetSettingFrm
                meetTitle={meetTitle}
                setMeetTitle={setMeetTitle}
                // meetMaterials={meetMaterials}
                // setMeetMaterials={setMeetMaterials}
                meetContentS={meetContentS}
                setMeetContentS={setMeetContentS}
                meetContentD={meetContentD}
                setMeetContentD={setMeetContentD}
                meetDate={meetDate}
                setMeetDate={setMeetDate}
                meetAddress1={meetAddress1}
                setMeetAddress1={setMeetAddress1}
                meetAddress2={meetAddress2}
                setMeetAddress2={setMeetAddress2}
                meetLatitude={meetLatitude}
                setMeetLatitude={setMeetLatitude}
                meetLongitude={meetLongitude}
                setMeetLongitude={setMeetLongitude}

                meetTotal={meetTotal}
                setMeetTotal={setMeetTotal}
                meetThumbnail={meetThumbnail}
                setMeetThumbnail={setMeetThumbnail}
                meetThumbnailPreview={meetThumbnailPreview}
                setMeetThumbnailPreview={setMeetThumbnailPreview}
                meetPrepare={meetPrepare}
                setMeetPrepare={setMeetPrepare}
                meetPrepareList={meetPrepareList}
                setMeetPrepareList={setMeetPrepareList}
                meetCategory={meetCategory}
                setMeetCategory={setMeetCategory}

                buttonEvent={meetModifyBtn}
                type="modify"
            />
        </div>
    )
}

export default MeetModify;