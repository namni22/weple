import "./modifyInfo.css";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const ModifyInfo = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const [memberEmail, setMemberEmail] = useState(member.memberEmail);
  const [memberPhone, setMemberPhone] = useState(member.memberPhone);
  const [memberBirth, setMemberBirth] = useState(member.memberBirth);
  const [memberCategory, setMemberCategory] = useState(member.memberCategory);
  const setIsLogin = props.setIsLogin;
  const subCategory = props.subCategory;
  const myCategory = props.myCategory;
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory2, setSubCategory2] = useState([]);
  const [selected, setSelected] = useState();
  const [subInformation, setSubInformation] = useState([]);
  const [subTag, setSubTag] = useState([]);
  const [subValue, setSubValue] = useState([]);
  // 대표 사진 바꿨을 때 사용
  const [profileImg, setProfileImg] = useState(null);
  // 화면용 memberImage
  const [memberImage, setMemberImage] = useState(
    "/member/" + member.memberImage
  );
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkBirthMsg, setCheckBirthMsg] = useState("");

  useEffect(() => {
    axios
      .get("/member/categoryList")
      .then((res) => {
        res.data.forEach((item) => {
          mainCategory.push(item);
          setMainCategory([...mainCategory]);
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  useEffect(() => {
    // 내가 선택한 카테고리 이름 배열 만들기
    myCategory.forEach((item) => {
      subCategory.forEach((ct) => {
        if (item == ct.categoryNo) {
          if (ct.categoryName === "기타") {
            if (ct.categoryRefNo === 1) {
              categoryNameList.push("스포츠");
            } else if (ct.categoryRefNo === 8) {
              categoryNameList.push("공예DIY");
            } else if (ct.categoryRefNo === 14) {
              categoryNameList.push("요리");
            } else if (ct.categoryRefNo === 19) {
              categoryNameList.push("문화예술");
            } else if (ct.categoryRefNo === 25) {
              categoryNameList.push("자기계발");
            } else if (ct.categoryRefNo === 30) {
              categoryNameList.push("여행");
            }
          } else {
            categoryNameList.push(ct.categoryName);
          }
          setCategoryNameList([...categoryNameList]);
        }
      });
    });
  }, [myCategory]);

  const resetMemberCategory = () => {
    setMemberCategory(member.memberCategory); // Set the state to its initial value
  };

  // 서브 카테고리 출력 함수
  const printSub = () => {
    const mainKeyword = document.getElementById("main-category");
    const categoryNo = mainKeyword.options[mainKeyword.selectedIndex].value;
    if (!categoryNo) {
      // 모든 state reset
      resetMemberCategory();
      return;
    } else {
      axios
        .get("/member/subcategory/" + categoryNo)
        .then((res) => {
          const sub = document.getElementById("sub-category");
          sub.style.display = "inline-block";
          res.data.forEach((item) => {
            subCategory2.push(item);
          });
          setSubCategory2([...subCategory2]);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };

  // 서브 카테고리 선택 시 텍스트 출력 함수
  const printSelect = () => {
    const sub = document.getElementById("sub-category");
    const subInfo = sub.options[sub.selectedIndex];
    const subInfoList = [...subInformation];
    subInfoList.push(subInfo); // <option value="3">구기스포츠</option>

    if (!subInfo) {
      resetMemberCategory();
      return;
    } else {
      const emptyArr = [];
      setSubCategory2([...emptyArr]);

      const newSubInfoList = [];
      const newSubTagList = [];
      const newSubValueList = [];
      const selectedValues = newSubValueList;

      // 기타 선택 시 대분류 이름 출력하기 위해 필요
      const main = document.getElementById("main-category");
      const mainName = main.options[main.selectedIndex].innerText;
      subInfoList.forEach((item) => {
        if (selectedValues.includes(item.value)) {
          Swal.fire("이미 선택된 항목입니다.");
          return;
        }
        if (newSubInfoList.length < 5) {
          if (item.text === "기타") {
            if (item.value == 7) {
              newSubInfoList.push(item);
              newSubTagList.push("스포츠");
              newSubValueList.push(item.value);
            } else if (item.value == 13) {
              newSubInfoList.push(item);
              newSubTagList.push("공예DIY");
              newSubValueList.push(item.value);
            } else if (item.value == 18) {
              newSubInfoList.push(item);
              newSubTagList.push("요리");
              newSubValueList.push(item.value);
            } else if (item.value == 24) {
              newSubInfoList.push(item);
              newSubTagList.push("문화예술");
              newSubValueList.push(item.value);
            } else if (item.value == 29) {
              newSubInfoList.push(item);
              newSubTagList.push("자기계발");
              newSubValueList.push(item.value);
            } else if (item.value == 34) {
              newSubInfoList.push(item);
              newSubTagList.push("여행");
              newSubValueList.push(item.value);
            }
          } else {
            newSubInfoList.push(item);
            newSubTagList.push(item.text);
            newSubValueList.push(item.value);
          }

          setSubInformation(newSubInfoList);
          setSubTag(newSubTagList); //최종 출력되는 list
          setSubValue([...newSubValueList]);

          main.options[0].selected = true;
          sub.options[0].selected = true;
          sub.style.display = "none";
        }
        //5개 이상 선택된 경우
        else {
          Swal.fire("5개까지 선택가능합니다.");
          return;
        }
      });
    }
    // 대분류 소분류 선택상태 리셋
  };

  // 회원가입 시 넘겨줄 memberCategory 문자열 만듦
  useEffect(() => {
    if (subValue.length === 0) {
      resetMemberCategory();
    } else {
      const cate = subValue.join();
      setMemberCategory(cate);
    }
  }, [subValue]);

  // 프로필 사진 새로 업로드 했을 시 작동하는 함수(미리보기 변경)
  const profileImgChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setProfileImg(files[0]); // 썸네일 파일 전송을 위한 state에 파일 객체 저장
      // 화면 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setMemberImage(reader.result);
      };
    } else {
      setProfileImg(null);
      setMemberImage("/member/" + member.memberImage);
    }
  };

  const deleteMember = () => {
    Swal.fire({
      icon: "warning",
      title: "회원 탈퇴",
      text: "[WEPLE]을 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "회원 탈퇴",
      cancelButtonText: "취소",
    }).then((res) => {
      // 회원 탈퇴 누른 경우
      if (res.isConfirmed) {
        const token = window.localStorage.getItem("token");
        axios
          .post("/member/delete", null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            window.localStorage.removeItem("token");
            setIsLogin(false);
            Swal.fire({
              icon: "success",
              title: "[WEPLE]탈퇴가 완료되었습니다.",
            });
            navigate("/");
          })
          .catch((res) => {
            if (res.response.status === 403) {
              console.log("로그인이 풀린 상황");
              setIsLogin(false);
            }
          });
      }
    });
  };

  // 카테고리 태그 선택 시 x 누르면 선택 카테고리 태그 삭제
  const deleteTag = (subInformation2, subTag2, subValue2, index) => {
    const newArr = subInformation2.splice(index, 1);
    const newArr2 = subInformation.filter(function (item) {
      return item !== newArr;
    });
    setSubInformation(newArr2);
    const newArr3 = subTag2.splice(index, 1);
    const newArr4 = subTag.filter(function (item) {
      return item !== newArr3;
    });
    setSubTag(newArr4);
    const newArr5 = subValue2.splice(index, 1);
    const newArr6 = subValue.filter(function (item) {
      return item !== newArr5;
    });
    setSubValue(newArr6);
  };

  // 수정 버튼 클릭 시 수정 작업
  const updateInfo = () => {
    const token = window.localStorage.getItem("token");
    const form = new FormData();

    if (checkBirthMsg == "" && checkPhoneMsg == "" && checkEmailMsg == "") {
      form.append("memberNo", member.memberNo);
      form.append("memberEmail", memberEmail);
      form.append("memberBirth", memberBirth);
      form.append("memberPhone", memberPhone);
      form.append("memberImage", memberImage);
      form.append("memberCategory", memberCategory);
      form.append("profileImg", profileImg);
      axios
        .post("/member/modifyInfo", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            Swal.fire("정보 수정이 완료되었습니다.");
            navigate("/mypage/profile/myFeed");
          } else {
            Swal.fire(
              "정보 수정 중 문제가 발생했습니다. 잠시 후 다시 시도하세요."
            );
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  const phoneCheck = () => {
    const phoneReg = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
    if (!phoneReg.test(memberPhone)) {
      setCheckPhoneMsg("ex) 010-123(4)-1234 형식으로 입력해주세요.");
    } else {
      setCheckPhoneMsg("");
    }
  };

  const emailCheck = () => {
    const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    if (!emailReg.test(memberEmail)) {
      setCheckEmailMsg("ex) weple@weple.co.kr 형식으로 입력해주세요. ");
    } else {
      setCheckEmailMsg("");
    }
  };

  const birthCheck = () => {
    const birthReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    if (!birthReg.test(memberBirth)) {
      setCheckBirthMsg("ex) 1990-01-01 형식으로 입력해주세요.");
    } else {
      setCheckBirthMsg("");
    }
  };

  return (
    <div className="modifyInfo-wrap">
      <div className="modifyInfo-content-wrap">
        <div className="myPage-title">정보 수정</div>
        <div className="modifyInfo-content">
          <ModifyInputWrap
            label="아이디"
            type="text"
            data={member.memberId}
            readOnly
          />
          <ModifyInputWrap
            label="이름"
            type="text"
            data={member.memberName}
            readOnly
          />
          <ModifyInputWrap
            content="memberPhone"
            label="전화번호"
            type="text"
            data={memberPhone}
            setData={setMemberPhone}
            msgClass="check-msg"
            blurEvent={phoneCheck}
            checkMsg={checkPhoneMsg}
          />
          <ModifyInputWrap
            content="memberBirth"
            label="생년월일"
            type="text"
            data={memberBirth}
            setData={setMemberBirth}
            checkMsg={checkBirthMsg}
            blurEvent={birthCheck}
            msgClass="check-msg"
          />
          <ModifyInputWrap
            content="memberEmail"
            label="이메일"
            type="text"
            data={memberEmail}
            setData={setMemberEmail}
            msgClass="check-msg"
            blurEvent={emailCheck}
            checkMsg={checkEmailMsg}
          />
          <div className="modifyInfo-info">
            <div>
              <div className="label">
                <label htmlFor="memberImage">대표 이미지</label>
              </div>
              <div className="input">
                <div className="join-profileImg-pre">
                  {memberImage === "/member/null" ? (
                    <img src="/img/testImg_01.png" />
                  ) : (
                    <img src={memberImage} />
                  )}
                </div>
                <label className="join-profileImg" htmlFor="memberImage">
                  이미지 업로드
                </label>
                <input
                  type="file"
                  className="join-imgUp-btn"
                  id="memberImage"
                  accept="image/*"
                  onChange={profileImgChange}
                />
              </div>
            </div>
          </div>
          <div className="modifyInfo-info">
            <div>
              <div className="label">
                <label>관심 카테고리</label>
              </div>
              <div className="input">
                <div className="current-category">
                  {categoryNameList.map((ctName, index) => {
                    return (
                      <span key={"ctName" + index}>
                        <img src="/img/hashtag.png" />
                        {ctName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="modifyInfo-info">
            <div>
              <div className="label">
                <label>카테고리 수정</label>
              </div>
              <div className="input">
                <select
                  id="main-category"
                  defaultValue="default"
                  onChange={printSub}
                  value={selected}
                >
                  <option value="default" disabled>
                    대분류
                  </option>
                  {mainCategory.map((main, index) => {
                    return (
                      <option key={"main" + index} value={main.categoryNo}>
                        {main.categoryName}
                      </option>
                    );
                  })}
                </select>
                <select
                  id="sub-category"
                  name="categoryNo"
                  defaultValue="default"
                  onChange={printSelect}
                >
                  <option value="default" disabled>
                    소분류
                  </option>
                  {subCategory2.map((sub, index) => {
                    return (
                      <option key={"sub" + index} value={sub.categoryNo}>
                        {sub.categoryName}
                      </option>
                    );
                  })}
                </select>
                <div className="join-select-print-box">
                  {subTag.map((subT, index) => {
                    return (
                      <div className="print-box-item">
                        <div key={"subT" + index}>
                          <img src="/img/hashtag.png" />
                          {subT}
                        </div>
                        <img
                          src="/img/delete.png"
                          onClick={() => {
                            deleteTag(subInformation, subTag, subValue, index);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="leave-btn">
            <Button2 text="회원탈퇴" clickEvent={deleteMember} />
          </div>
          <div className="modify-btn">
            <div>
              <Button1 text="수정" clickEvent={updateInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModifyInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const placeholder = props.placeholder;
  const readOnly = props.readOnly;
  const checkMsg = props.checkMsg;
  const msgClass = props.msgClass;

  return (
    <div className="modifyInfo-info">
      <div>
        <div className="label">
          <label>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </div>
      </div>
      <div className={msgClass}>{checkMsg}</div>
    </div>
  );
};

export default ModifyInfo;
