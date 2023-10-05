import { useState } from "react";
import MeetSettingFrm from "./MeetSettingFrm";

const MeetCreate = () => {
    const [meetTitle, setMeetTitle] = useState("");
    const [meetMaterials, setMeetMaterials] = useState("");
    const [meetThumbnail, setmeetThumbnail] = useState({});
    
    
    const meetCreate= ()=>{
        console.log("연결");
        console.log(meetTitle);
        console.log(meetThumbnail);
    }

    return (
        <div>MeetCreate
            <MeetSettingFrm 
                meetTitle={meetTitle} 
                setMeetTitle={setMeetTitle}
                meetMaterials={meetMaterials}
                setMeetMaterials={setMeetMaterials}
                buttonEvent={meetCreate}
            />
        </div>

    );
}

export default MeetCreate;