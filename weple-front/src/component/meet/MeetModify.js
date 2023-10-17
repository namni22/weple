import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import MeetSettingFrm from "./MeetSettingFrm";

const MeetModify = () => {
    const location = useLocation();
    const meet = location.state.meet;
    console.log("meet 수정", meet);

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
    const [meetThumbnailPreview, setMeetThumbnailPreview] = useState(meet.meetThumbnailPreview);
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
        console.log("수정완료버튼 눌럿을때");
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