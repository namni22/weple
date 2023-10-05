import { useState } from "react";
import MeetSettingFrm from "./MeetSettingFrm";

const MeetCreate = () => {
    const [meetTitle, setMeetTitle] = useState("");
    const [meetContentS, setMeetContentS] = useState("");
    const [meetContentD, setMeetContentD] = useState("");
    const [meetThumbnail, setmeetThumbnail] = useState({});
    const [meetDate, setMeetDate] = useState("");
    const [meetTotal, setMeetTotal] = useState("");
    const [meetMargin, setMeetMargin] = useState(0)
    const [meetPrepare, setMeetPrepare] = useState("");
    // 카테고리 자리
    const [meetAddress1, setMeetAddress1] = useState("");
    const [meetAddress2, setMeetAddress2] = useState("");
    const [meetName, setMeetName] = useState("");


    const [meetMaterials, setMeetMaterials] = useState("");



    const meetCreate = () => {
        console.log("연결");
        console.log(meetTitle);
        console.log(meetThumbnail);
    }

    return (
        <div>MeetCreate
            <MeetSettingFrm
                meetTitle={meetTitle}
                setMeetTitle={setMeetTitle}
                meetContentS={meetContentS}
                setMeetContentS={setMeetContentS}
                meetContentD={meetContentD}
                setMeetContentD={setMeetContentD}
                meetMaterials={meetMaterials}
                setMeetMaterials={setMeetMaterials}
                meetDate={meetDate}
                setMeetDate={setMeetDate}
                meetTotal={meetTotal}
                setMeetTotal={setMeetTotal}

                buttonEvent={meetCreate}
            />
        </div>

    );
}

export default MeetCreate;