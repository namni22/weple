import { useState } from "react";
import MeetSettingFrm from "./MeetSettingFrm";

const MeetCreate = () => {
    const [meetTitle, setMeetTitle] = useState("");
    const [meetMaterials, setMeetMaterials] = useState("");
    
    return (
        <div>MeetCreate
            <MeetSettingFrm 
                meetTitle={meetTitle} 
                setMeetTitle={setMeetTitle}
                meetMaterials={meetMaterials}
                setMeetMaterials={setMeetMaterials}
            />
        </div>

    );
}

export default MeetCreate;