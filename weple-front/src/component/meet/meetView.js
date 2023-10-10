import { useLocation } from "react-router";
import "./meetView.css";
import axios from "axios";
const MeetView = () => {

    const location = useLocation();
    const meetNo = location.state.meetNo;
    console.log(meetNo);
    // 서버에서 axios로 상세보기 meet정보 가져오기
    axios
        .get("/meet/meetView/" + meetNo)
        .then((res) => {
            console.log(res.data);
        })
        .catch((res) => {
            // console.log(res.response.status);
        })

    return (
        <div>모임상세보기</div>
    );
}

export default MeetView;