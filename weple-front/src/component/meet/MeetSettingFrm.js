import "./meetSettingFrm.css";

import { Button1, Button2 } from "../util/Button";
import TextEditor from "../util/TextEditor";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Input from "../util/InputFrm";
import axios from "axios";
import Swal from "sweetalert2";

const MeetSettingFrm = (props) => {
    // 모임만들 정보 선언 //create에서 받음 // update에서 받을예정
    const meetTitle = props.meetTitle;
    const setMeetTitle = props.setMeetTitle;
    // const meetMaterials = props.meetMaterials;
    // const setMeetMaterials = props.setMeetMaterials;
    const meetContentS = props.meetContentS;
    const setMeetContentS = props.setMeetContentS;
    const meetContentD = props.meetContentD;
    const setMeetContentD = props.setMeetContentD;
    const meetDate = props.meetDate;
    const setMeetDate = props.setMeetDate;
    const meetTotal = props.meetTotal;
    const setMeetTotal = props.setMeetTotal;

    const meetThumbnail = props.meetThumbnail;
    const setMeetThumbnail = props.setMeetThumbnail;

    //썸네일 미리보기용
    const meetThumbnailPreview = props.meetThumbnailPreview;
    const setMeetThumbnailPreview = props.setMeetThumbnailPreview;

    // 준비물 리스트 추가용
    const meetPrepare = props.meetPrepare;
    const setMeetPrepare = props.setMeetPrepare;
    const meetPrepareList = props.meetPrepareList;
    const setMeetPrepareList = props.setMeetPrepareList;

    //카테고리
    const meetCategory = props.meetCategory;
    const setMeetCategory = props.setMeetCategory;

    const buttonEvent = props.buttonEvent;

    //카테고리 소분류 담아두는 리스트
    const [smallCategoryList, setSmallCategoryList] = useState([]);

    // 지도
    // const container = document.getElementById('map');//지도를 담을 영역의 dom 레퍼런스
    // const options ={
    //     center : new kakao.maps.LatLng(33.45, 126.57)
    // }
    // const map = new kakao.maps.Map(container, options);

    //카테고리 소분류 불러오는 함수
    const selectSmallCategory = (categoryNum) => {
        //categoryNum 넘겨받은 bigCategoryNo
        const bigCategoryNo = categoryNum;
        axios
            .get("/meet/selectSmallCategory/" + bigCategoryNo)
            .then((res) => {
                // console.log(res.data);
                setSmallCategoryList(res.data);
            })
            .catch((res) => {
                console.log("catch : " + res.response.status);
            });
    }

    //   썸네일 미리보기 함수
    const thumbnailChange = (e) => {
        const files = e.currentTarget.files;
        if (files.length !== 0 && files[0] != 0) {
            // 파일이 들어왔을때
            setMeetThumbnail(files[0]); //썸네일 파일 전송을 위한 state에 값 파일객체 저장
            //화면에 썸네일 미리보기
            const reader = new FileReader(); //객체만들고
            reader.readAsDataURL(files[0]); //파일 읽어와
            reader.onloadend = () => {
                setMeetThumbnailPreview(reader.result);
                console.log("썸네일 바꼇을때 : " + meetThumbnailPreview);
            };
        } else {
            // 파일이 취소됐을때
            setMeetThumbnail(null); //썸내일 빈객체로
            setMeetThumbnailPreview(null); //보드이미지 빈문자열로 //빈문자열에서 null로 바꿈
        }
    };

    //날짜 변경 인풋에서 포커스가 나갔을때 작동하는 함수
    //날짜를 9999년 이상 선택하게하 하지 못하게 하기 위해서
    const changeDate = (meetDate) => {
        console.log("모임 날짜 타입 : " + typeof meetDate);
        if (meetDate) {
            console.log(meetDate.substr(3, 1));
            if (meetDate.substr(4, 1) !== "-") {//2023-00-00 에서 5번째글자가 "-"가 아니라면
                setMeetDate("");
                Swal.fire("날짜 형식은 0000-00-00 입니다.")
            }
        }
    }

    //모임 인원 변경 함수
    const changeMeetTotal = (e) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value < 1) {
            setMeetTotal(1);
        }
        else if (e.currentTarget.value > 100) {
            setMeetTotal(100);
        }
        else {
            setMeetTotal(e.currentTarget.value)
        }
    }

    // 준비물 추가버튼 눌럿을때 작동하는 함수
    const meetPrepareAdd = () => {
        if (meetPrepare !== "") {//준비물 input이 빈칸이 아닐때만 추가
            const meetPrepare2 = document.querySelector("#meetPrepare").value
            setMeetPrepare(meetPrepare2)
            console.log("추가한 준비물 : " + meetPrepare2);
            const newArr = [...meetPrepareList];//깊은복사해서
            newArr.push(meetPrepare2);
            setMeetPrepareList(newArr);
            setMeetPrepare("");//준비물 input 비워주기
            console.log(meetPrepareList);

        }

    };

    //준비물 삭제 버튼 눌럿을때 작동하는 함수
    const deleteMeetPrepare = (meetPrepareList2, index) => {
        // console.log("넘겨받은 준비물 리스트 ", meetPrepareList2);
        // console.log("원본 준비물 리스트 : ", meetPrepareList);

        const newArr = meetPrepareList2.splice(index, 1);
        const newArr2 = meetPrepareList.filter(function (item) {
            return item !== newArr;
        });
        console.log("삭제 완료 한 새 배열 : ", newArr2);

        setMeetPrepareList(newArr2)
    }

    const enterEvent = (e) => {
        if (e.key === "Enter") {
            meetPrepareAdd();
        }
    };

    return (
        <div className="meetSettingFrm-main-wrap">

            <div className="meetSettingFrm-wrap">
                <div className="meetCategoriFrm">
                    <label>카테고리</label>
                    <div>
                        <div>
                            <ul className="meetSettingFrm-bigCategory-ul">
                                <li onClick={() => {
                                    selectSmallCategory(1);
                                }}>스포츠</li>

                                <li onClick={() => {
                                    selectSmallCategory(30);
                                }}>여행</li>

                                <li onClick={() => {
                                    selectSmallCategory(14);
                                }}>요리</li>

                                <li onClick={() => {
                                    selectSmallCategory(8);
                                }}>공예DIY</li>

                                <li onClick={() => {
                                    selectSmallCategory(25);
                                }}>자기개발</li>

                                <li onClick={() => {
                                    selectSmallCategory(19);
                                }}>문화예술</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="meetSettingFrm-smallCategory-ul">
                                {smallCategoryList.map((smallCategory, index) => {
                                    return (
                                        <li
                                            key={"smallCategory" + index}
                                            className="meetSettingFrm-smallCategory-li"
                                            onClick={() => {
                                                setMeetCategory(smallCategory.categoryNo);
                                                console.log("선택한 카테고리번호 : " + meetCategory);
                                            }}
                                        >
                                            <div>{smallCategory.categoryName}</div>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="meetTitleFrm">
                    <label htmlFor="meetTitleFrm">모임 이름</label>
                    <div className="jwInput" id="jwInput">
                        <Input
                            type="text"
                            data={meetTitle}
                            setData={setMeetTitle}
                            content="meetTitleFrm"
                        />
                    </div>
                </div>
                <div className="meetThumbnailFrm">
                    <label>썸네일</label>
                    <div>
                        {/* accept = image/* : 이미지파일만 올릴수 있도록 */}


                        <input
                            className="meetThumbnail-input"
                            type="file"
                            id="meetThumbnail"
                            accept="image/*"
                            // 파일선택을 바꿀때 이벤트 발생
                            //썸네일 미리보기 함수
                            onChange={thumbnailChange}
                        ></input>



                        <div className="meetThumbnailPreview">
                            {/* <img src={meetThumbnail2}></img> */}
                            {meetThumbnailPreview === null ? ( //""에서 null로 바꿈
                                // 기본이미지 넣어야함
                                <img src="/img/main_1.jpg"></img>
                            ) : (
                                <img src={meetThumbnailPreview}></img>
                            )}
                        </div>

                    </div>

                </div>
                <div className="meetDateFrm">
                    <label>모임날짜</label>
                    <Input
                        type="date"
                        data={meetDate}
                        setData={setMeetDate}
                        blurEvent={() => {
                            changeDate(meetDate);
                        }}

                    />
                </div>
                <div className="meetPlaceFrm">
                    <label>모임위치</label>
                    <div id="map" style={{ width: '500px', height: '500px' }}>
                        <Kakao2></Kakao2>
                    </div>
                </div>
                <div className="meetMemberLimitFrm">
                    <label>모임참여인원</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        onChange={changeMeetTotal}
                        className="meetMemberLimit-input"
                        value={meetTotal}

                    >


                    </input>

                </div>
                <div>
                    <label>모임 한줄 설명</label>
                    <Input
                        type="text"
                        data={meetContentS}
                        setData={setMeetContentS}
                    // content=""
                    />
                </div>
                <div className="meetContentFrm">
                    <label>모임설명</label>
                    <div className="meetContentD-box">
                        <TextEditor
                            data={meetContentD}
                            setData={setMeetContentD}
                            url="/meet/meetContentDImg"
                        />

                    </div>



                </div>
                <div className="meetMaterialsFrm">
                    <label>준비물</label>
                    <div className="meetMaterials-content-wrap">
                        <div className="meetMaterials-input-box">
                            <Input
                                type="text"
                                data={meetPrepare}
                                setData={setMeetPrepare}
                                content="meetPrepare"
                                enter={enterEvent}
                            ></Input>
                        </div>
                        <div className="meetMaterialsInsert-btn-box">
                            <Button2 text="추가" clickEvent={meetPrepareAdd}></Button2>
                        </div>
                        <div className="meetMaterials-wrap">

                            {meetPrepareList.map((meetPrepare, index) => {
                                return (
                                    <div key={"meetPrepare" + index} className="meetMaterials-one">
                                        <span class="material-icons ">{meetPrepare}</span>
                                        <span
                                            class="material-icons delete-meetPrepare"
                                            onClick={() => {
                                                deleteMeetPrepare(meetPrepareList, index);
                                            }}
                                        >clear</span>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
                <div className="meet-btn-box">
                    <Button1 text="모임생성" clickEvent={buttonEvent}></Button1>
                </div>

            </div>
        </div >
    );


}

const { kakao } = window;
const Kakao2 = () => {
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.566826, 126.9786567), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }, [])
    return (
        <div id="map" style={{
            width: "500px",
            height: "500px"
        }}></div>
    )
}




export default MeetSettingFrm;