import { useState } from "react";
import MeetSettingFrm from "./MeetSettingFrm";
import axios from "axios";
import Swal from "sweetalert2";


const MeetCreate = () => {
    const [meetTitle, setMeetTitle] = useState("");
    const [meetContentS, setMeetContentS] = useState("");
    const [meetContentD, setMeetContentD] = useState("");
    const [meetThumbnail, setMeetThumbnail] = useState({});
    const [meetDate, setMeetDate] = useState("");
    const [meetTotal, setMeetTotal] = useState("");
    const [meetMargin, setMeetMargin] = useState(0)
    const [meetPrepare, setMeetPrepare] = useState("");
    // 카테고리 자리
    const [meetAddress1, setMeetAddress1] = useState("");
    const [meetAddress2, setMeetAddress2] = useState("");
    const [meetName, setMeetName] = useState("");


    const [meetMaterials, setMeetMaterials] = useState("");



    //write역할
    const meetCreateBtn = () => {
        console.log("모임제목 : " + meetTitle);
        console.log("모임 날짜 : " + meetDate);
        console.log("모임한줄설명 : " + meetContentS);
        console.log("모임인원 :" + meetTotal);
        console.log("썸네일 : " + meetThumbnail);

        const meet = { meetTitle, meetDate, meetTotal, meetContentS, meetContentD }
        if (meetTitle !== "" && meetDate !== "" && meetTotal !== "" && meetContentS !== "") {
            const form = new FormData();
            form.append("meetTitle", meetTitle);
            form.append("meetDate", meetDate);
            form.append("meetContentS", meetContentS);
            form.append("meetTotal", meetTotal);
            form.append("meetThumbnail", meetThumbnail);
            axios
                .post("/meet/meetCreate", form)
                .then()
                .catch();


        } else {
            Swal.fire("입력값을 확인하세요")
        }

    }

    return (
        <div>MeetCreate
            <MeetSettingFrm
                meetTitle={meetTitle}
                setMeetTitle={setMeetTitle}
                meetMaterials={meetMaterials}
                setMeetMaterials={setMeetMaterials}
                meetContentS={meetContentS}
                setMeetContentS={setMeetContentS}
                meetContentD={meetContentD}
                setMeetContentD={setMeetContentD}
                meetDate={meetDate}
                setMeetDate={setMeetDate}
                meetTotal={meetTotal}
                setMeetTotal={setMeetTotal}

                meetThumbnail={meetThumbnail}
                setMeetThumbnail={setMeetThumbnail}

                buttonEvent={meetCreateBtn}
            />
        </div>

    );
}

export default MeetCreate;