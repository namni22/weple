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

  const [loginMember, setLoginMember] = useState({});
  const [loginMemberNo, setLoginMemberNo] = useState(0);
  const [categoryType, setCategoryType] = useState(0);//카테고리타입 0:대분류 그외:소분류,카테고리번호를 담는변수

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
  useEffect(() => {//reqPage, 카테고리 타입이 바뀔경우 동작
    if (categoryType === 0) {//카테고리타입이 대분류 라면 아래 axios 수행
      axios
        .get("/meet/meetList/" + reqPage + "/" + bigCategoryNo + "/" + loginMemberNo)
        .then((res) => {
          console.log("조회 결과 : ", res.data.meetList);
          setMeetList(res.data.meetList);
          //페이지인포 셋팅
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          console.log("catch : " + res.response.status);
        });
    } else {//카테고리타입이 소분류면 카테고리번호 들고 가서 axios 수행

      axios
        .get("/meet/categoryMeetList/" + reqPage + "/" + categoryType + "/" + loginMemberNo)
        .then((res) => {
          // console.log(res.data);
          setMeetList(res.data.meetList);
          console.log("조회결과 : ", res.data.meetList);
          //페이지인포 셋팅
          setPageInfo(res.data.pi);
        })
        .catch((res) => {
          console.log("catch : " + res.response.status);
        });

    }
  }, [reqPage, loginMemberNo, categoryType]);

  //카테고리 메뉴바의 전체를 클릭하면 동작하는 함수
  const changeCategoryAll = (reqPage) => {
    setReqPage(1);//전체 클릭시 reqPage 초기화
    setCategoryType(0);//카테고리 타입을 0 (대분류로)
  };

  // 카테고리 메뉴바의 카테고리를 클릭하면 동작하는 함수
  const changeCategory = (smallCategory) => {
    setReqPage(1);
    setCategoryType(smallCategory.categoryNo);
  };


  //로그인을 했을경우 누가 로그인했는지 db에서 select해오기
  useEffect(() => {
    // setMeet(props.meet);
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
          //로그인한 멤버 번호
          // loginMemberNo = res.data.memberNo;
          setLoginMemberNo(res.data.memberNo)
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {//로그아웃하면 로그인멤버 초기화
      setLoginMember(null);
    }

  }, [isLogin])


  return (
    <div className="meetList-all-wrap">
      <div className="meetListCategori-area">
        <div className="bigCategoryName">{bigCategoryName}</div>
        <div>
          <ul className="smallCategory-ul">
            <li
              onClick={() => {
                changeCategoryAll(reqPage);
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
            <MeetItem
              key={"meet" + index}
              meet={meet}
              isLogin={isLogin}
              loginMember={loginMember}
              setLoginMember={setLoginMember}
            />
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
  // meet props로 전달해주시고 meetList 따로 select 해와서 map으로 반복 출력해주세요
  // const meet = props.meet;
  const navigate = useNavigate();
  const isLogin = props.isLogin;

  // const [loginMember, setLoginMember] = useState(null);
  // const loginMember = props.loginMember;//프롭스로 받기
  // const setLoginMember = props.setLoginMember;

  const [meet, setMeet] = useState({});
  const [isMeetLikeFront, setIsMeetLikeFront] = useState(0);
  // const isMeetLikeFront = props.isMeetLikeFront;
  // const setIsMeetLikeFront = props.setIsMeetLikeFront;

  useEffect(() => {
    setMeet(props.meet);
    setIsMeetLikeFront(props.meet.isMeetLike);
  }, [props])


  // 상세보기로 이동하는 함수
  const meetView = () => {
    // console.log("클릭하기 전 값 : ", meet, meet.meetNo);
    navigate("/meet/View", {
      state: { m: meet },
      // , isMeetLikeFront: { isMeetLikeFront }, setIsMeetLikeFront: { setIsMeetLikeFront }
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

  //모임 좋아요 누를시
  const meetLikeUp = (meet, isMeetLikeFront, setIsMeetLikeFront) => {
    console.log("좋아요 누르면", meet);
    const token = window.localStorage.getItem("token");
    axios
      .post("/meet/meetLikeUp", meet, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("좋아요");
        // setIsMeetLike(1);
        setIsMeetLikeFront(1);
        //다시 axios가서 바뀐 meet값 가져와서 set
        axios
          .get("/meet/selectOneMeet/" + meet.meetNo)
          .then((res) => {
            console.log(res.data);
            setMeet(res.data)
          })
          .catch((res) => {
            // console.log();
          })
      })
      .catch((res) => { });

    return
  }

  //모임 좋아요취소 누를시 
  const meetLikeCancle = (meet, isMeetLikeFront, setIsMeetLikeFront) => {
    console.log("좋아요 누르면", meet);
    const token = window.localStorage.getItem("token");
    axios
      .post("/meet/meetLikeCancle", meet, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("좋아요 취소");
        // setIsMeetLike(0);
        setIsMeetLikeFront(0);
      })
      .catch((res) => { });

    return
  }




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
        {isLogin ? (
          isMeetLikeFront === 1 ? (
            <span className="material-icons MeetList-like" onClick={() => { meetLikeCancle(meet, isMeetLikeFront, setIsMeetLikeFront); }} >favorite</span>
          ) : (
            <span className="material-icons MeetList-like" onClick={() => { meetLikeUp(meet, isMeetLikeFront, setIsMeetLikeFront) }} >favorite_border</span>
          )

        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export { MeetList, MeetItem };
