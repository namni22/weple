import { useEffect, useState } from "react";
import "./meetList.css";
import axios from "axios";
// import { Pagination } from "@mui/material";
import Pagination from "../common/Pagination";
import { useLocation, useNavigate } from "react-router";

const MeetList = (props) => {
  //로그인상태 불러올곳 ( 모임생성버튼이 이곳에 있다면 버튼을 위해서 )
  //const isLogin = props.isLogin;

  const [meetList, setMeetList] = useState([]);
  const [reqPage, setReqPage] = useState(1); //처음에는 1페이지
  const [pageInfo, setPageInfo] = useState({});
  const [meetCategory, setmeetCategory] = useState(1);
  //카테고리 메뉴 출력할 카테고리 리스트
  const [smallCategoryList, setSmallCategoryList] = useState([]);

  const location = useLocation();
  let bigCategoryNo = location.state.bigCategoryNo; //카테고리에서 넘어온거
  let bigCategoryName = location.state.bigCategoryName;

  const isLogin = props.isLogin;
  const id = props.id;

  //카테고리 메뉴 조회해오기
  useEffect(() => {
    // setmeetCategory(bigCategoryNo);
    axios
      .get("/meet/selectSmallCategory/" + bigCategoryNo)
      .then((res) => {
        // console.log(res.data);
        setSmallCategoryList(res.data);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  }, []);

  // 카테고리에서 넘어오면서 기본적으로 전체 모임 조회해오기
  useEffect(() => {
    axios
      .get("/meet/meetList/" + reqPage + "/" + bigCategoryNo)
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

  //카테고리 메뉴바의 전체를 클릭하면 동작하는 함수
  const changeCategoryAll = () => {
    axios
      .get("/meet/meetList/" + reqPage + "/" + bigCategoryNo)
      .then((res) => {
        console.log(res.data);
        setMeetList(res.data.meetList);
        //페이지인포 셋팅
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  };

  // 카테고리 메뉴바의 카테고리를 클릭하면 동작하는 함수
  const changeCategory = (smallCategory) => {
    const categoryNo = smallCategory.categoryNo;
    console.log("카테고리번호 : " + categoryNo);
    bigCategoryNo = smallCategory.categoryRefNo;
    const big = smallCategory.categoryRefNo; //선택한 카테고리의 대분류

    axios
      .get("/meet/categoryMeetList/" + reqPage + "/" + categoryNo)
      .then((res) => {
        // console.log(res.data);
        setMeetList(res.data.meetList);
        //페이지인포 셋팅
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log("catch : " + res.response.status);
      });
  };

  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">
        <div className="bigCategoryName">{bigCategoryName}</div>
        <div>
          <ul className="smallCategory-ul">
            <li
              onClick={() => {
                changeCategoryAll();
              }}
            >
              전체
            </li>
            {smallCategoryList.map((smallCategory, index) => {
              return (
                <li
                  key={"smallCategory" + index}
                  className="smallCategory-li"
                  onClick={() => {
                    changeCategory(smallCategory);
                  }}
                >
                  <div>{smallCategory.categoryName}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="meetList-area">
        {/* meetList db에서 받아온후 map으로 반복출력 예정 */}
        {/* props로 meet 정보 줄예정 */}
        {meetList.map((meet, index) => {
          return (
            <MeetItem key={"meet" + index} meet={meet} isLogin={isLogin} />
          );
        })}
      </div>
      <div className="meetList-page-area">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          setData={setMeetList}
        />
      </div>
    </div>
  );
};

const MeetItem = (props) => {
  // 연주님께~  meet props로 전달해주시고 meetList 따로 select 해와서 map으로 반복 출력해주세요
  // const meet = props.meet;
  const [meet, setMeet] = useState({});
  const navigate = useNavigate();
  const isLogin = props.isLogin;

  const [loginMember, setLoginMember] = useState(null);
  const [isMeetLike, setIsMeetLike] = useState(0);
  // const [meetLikeCurrentStatus, setMeetLikeCurrentStatus] = useState(null);

  // 상세보기로 이동하는 함수
  const meetView = () => {
    // console.log("클릭하기 전 값 : ", meet, meet.meetNo);
    navigate("/meet/View", {
      state: { m: meet },
    }); //이동할곳 state로 데이터 전송
  };

  const starRating = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <span className="material-icons" key={"starRating" + i}>
          grade
        </span>
      );
    }
    return result;
  };

  //모임 좋아요취소 누를시 
  const meetLikeCancle = (meet) => {
    console.log("좋아요 누르면", meet);
    const token = window.localStorage.getItem("token");
    axios
      .post("/meet/meetLikeCancle", meet, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {

      })
      .catch((res) => { });

    return
  }

  //로그인을 했을경우 누가 로그인했는지 db에서 select해오기
  useEffect(() => {
    setMeet(props.meet);
    const token = window.localStorage.getItem("token");
    if (isLogin) {

      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {

          setLoginMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });



    } else {//로그아웃하면 로그인멤버 초기화
      setLoginMember(null);
    }

  }, [isLogin])


  return (
    <div className="meet-one">
      <div className="MeetList-meet-img-box" onClick={meetView}>
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
            {starRating()}
          </div>
          <div className="star-rating-base">{starRating()}</div>
        </div>
        <div className="review-count">후기 {meet.reviewCount}</div>
      </div>
      <div className="MeetList-like-box">
        {loginMember ? (
          isMeetLike === 0 ? (
            <span className="material-icons MeetList-like" onClick={() => { meetLikeCancle(meet); }} >favorite</span>
          ) : (
            <span className="material-icons MeetList-like" >favorite_border</span>
          )

        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export { MeetList, MeetItem };
