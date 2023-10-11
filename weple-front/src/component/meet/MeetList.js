import { useEffect, useState } from "react";
import "./meetList.css";
import axios from "axios";
// import { Pagination } from "@mui/material";
import Pagination from "../common/Pagination";
import { useLocation, useNavigate } from "react-router";

const MeetList = () => {
  //로그인상태 불러올곳 ( 모임생성버튼이 이곳에 있다면 버튼을 위해서 )
  //const isLogin = props.isLogin;

  const [meetList, setMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //처음에는 1페이지
  const [pagenfo, setPageInfo] = useState({});
  const location = useLocation();
  const [meetCategory, setmeetCategory] = useState(1);
  const bigCategoryNo = location.state.bigCategoryNo;
  //카테고리 메뉴 출력할 카테고리 리스트
  const [smallCategoryList, setSmallCategoryList] = useState([]);

  //카테고리 메뉴 조회해오기
  useEffect(() => {
    setmeetCategory(bigCategoryNo);
    axios
      .get("/meet/selectSmallCategory/" + bigCategoryNo)
      .then((res) => {
        console.log(res.data);
        setSmallCategoryList(res.data);
        console.log("배열 하나 값 : " + res.data[1]);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  }, []);

  // 모임 조회해오기
  useEffect(() => {
    axios
      .get("/meet/meetList/" + reqPage + "/" + meetCategory)
      .then((res) => {
        console.log(res.data);
        setMeetList(res.data.meetList);
        //페이지인포 셋팅
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">
        <div>대분류</div>
        <div>
          <ul>
            <li>전체</li>
            {(smallCategory, index) => {
              return (
                <li key={"smallCategory" + index}>
                  {smallCategory.categoryName}
                </li>
              );
            }}
          </ul>
        </div>
      </div>
      <div className="meetList-area">
        {/* meetList db에서 받아온후 map으로 반복출력 예정 */}
        {/* props로 meet 정보 줄예정 */}
        {meetList.map((meet, index) => {
          return <MeetItem key={"meet" + index} meet={meet} />;
        })}
      </div>
      <div className="meetList-page-area">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pagenfo}
        />
      </div>
    </div>
  );
};

const MeetItem = (props) => {
  // 연주님께~  meet props로 전달해주시고 meetList 따로 select 해와서 map으로 반복 출력해주세요
  const meet = props.meet;

  const navigate = useNavigate();

  // 상세보기로 이동하는 함수
  const meetView = () => {
    navigate("/meet/meetList/View", { state: { m: meet } }); //이동할곳 state로 데이터 전송
  };
  const starRating = (meetStar) => {
    const result = [];
    for (let i = 0; i < Math.ceil(meetStar); i++) {
      result.push(
        <span className="material-icons" key={"starRating" + i}>
          grade
        </span>
      );
    }
    return result;
  };

  return (
    <div className="meet-one" onClick={meetView}>
      <div className="MeetList-meet-img-box">
        {/* <img src="/img/main_1.jpg"></img> */}
        <img src={"/meet/" + meet.meetThumbNail}></img>
      </div>
      <div className="MeetList-meetTitle">
        <span>{meet.meetTitle}</span>
      </div>
      <div className="">
        <span>인원 : </span>
        <span>{meet.meetTotal - meet.meetMargin}</span>
        <span>/</span>
        <span>{meet.meetTotal}</span>
      </div>
      <div className="star-wrap">
        <div className="star-rating">
          <div
            className="star-rating-fill"
            style={{ width: (meet.reviewStar / 5) * 100 + "%" }}
          >
            {starRating(meet.reviewStar)}
          </div>
          <div className="star-rating-base">
            <span className="material-icons">grade</span>
            <span className="material-icons">grade</span>
            <span className="material-icons">grade</span>
            <span className="material-icons">grade</span>
            <span className="material-icons">grade</span>
          </div>
        </div>
        <div className="review-count">후기 {meet.reviewCount}</div>
      </div>
      <div className="MeetList-like-box">
        <span className="material-icons MeetList-like">favorite_border</span>
      </div>
    </div>
  );
};

export { MeetList, MeetItem };
