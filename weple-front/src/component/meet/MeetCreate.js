import { useState } from "react";
import MeetSettingFrm from "./MeetSettingFrm";

const MeetCreate = () => {
    const [meetTitle, setMeetTitle] = useState("");
    
    return (
        <div>MeetCreate
            <MeetSettingFrm meetTitle={meetTitle} setMeetTitle={setMeetTitle}/>
        </div>

    );
}

export default MeetCreate;