import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JoinFrm = (props) => {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberBirth, setMemberBirth] = useState("");
  const [memberGender, setMemberGender] = useState("");
  const [memberImage, setMemberImage] = useState("");
  const [memberCategory, setMemberCategory] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkPwReMsg, setCheckPwReMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [useId, setUseId] = useState(false);
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryNo, setCategoryNo] = useState(null);
  const [selected, setSelected] = useState();
  const [subInformation, setSubInformation] = useState([]);
  const [subTag, setSubTag] = useState([]);
  const [subValue, setSubValue] = useState([]);

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

  // 서브 카테고리 출력 함수
  const printSub = () => {
    const mainKeyword = document.getElementById("main-category");
    const categoryNo = mainKeyword.options[mainKeyword.selectedIndex].value;

    axios
      .get("/member/subcategory/" + categoryNo)
      .then((res) => {
        const sub = document.getElementById("sub-category");
        sub.style.display = "inline-block";
        res.data.forEach((item) => {
          subCategory.push(item);
        });
        setSubCategory([...subCategory]);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  // 서브 카테고리 선택 시 텍스트 출력 함수
  const printSelect = () => {
    const sub = document.getElementById("sub-category");
    const subInfo = sub.options[sub.selectedIndex];
    const subInfoList = [...subInformation];
    subInfoList.push(subInfo); // <option value="3">구기스포츠</option>

    const emptyArr = [];
    setSubCategory([...emptyArr]);
    const newSubInfoList = [];
    const newSubTagList = [];
    const newSubValueList = [];
    const main = document.getElementById("main-category");
    const mainName = main.options[main.selectedIndex].innerText;
    subInfoList.forEach((item) => {
      if (!newSubInfoList.includes(item)) {
        //태그가 처음 선택된 경우
        if (newSubInfoList.length < 5) {
          if (item.text === "기타") {
            newSubInfoList.push(item);
            newSubTagList.push(mainName);
            newSubValueList.push(item.value);
          } else {
            newSubInfoList.push(item);
            newSubTagList.push(item.text);
            newSubValueList.push(item.value);
          }
          setSubInformation(newSubInfoList);
          setSubTag(newSubTagList); //최종 출력되는 list
          const cate = newSubValueList.join();
          setMemberCategory(cate);

          main.options[0].selected = true;
          sub.options[0].selected = true;
          sub.style.display = "none";
        }
        //5개 이상 선택된 경우
        else {
          alert("카테고리는 5개까지 선택가능합니다.");
          return;
        }
        //이미 값이 있는 경우
      } else {
        alert("이미 선택된 카테고리입니다.");
      }
    });
  };

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
      setProfileImg({});
      setMemberImage(null);
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

  const pwCheck = () => {
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!pwReg.test(memberPw)) {
      setCheckPwMsg(
        "비밀번호는 최소 8자, 최소 하나의 문자 및 숫자를 포함해야 합니다."
      );
    } else {
      setCheckPwMsg("");
    }
  };

  const pwReCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwReMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwReMsg("");
    }
  };

  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;

    if (!idReg.test(memberId)) {
      // 정규표현식 만족하지 못했을 때
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자 입니다.");
      setUseId(false);
    } else {
      axios
        .get("/member/checkId/" + memberId)
        .then((res) => {
          console.log(res.data);
          if (res.data == 0) {
            setCheckIdMsg("사용 가능한 아이디 입니다.");
            setUseId(true);
          } else {
            setCheckIdMsg("이미 사용중인 아이디입니다.");
            setUseId(false);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const clickRadio = (e) => {
    console.log(e.target.value);
    setMemberGender(e.target.value);
  };

  // 회원가입 insert
  const join = () => {
    console.log(memberId);
    console.log(memberPw);
    console.log(memberName);
    console.log(memberPhone);
    console.log(memberGender);
    console.log(memberBirth);
    console.log(memberEmail);
    console.log(memberCategory);
    console.log(profileImg);
    const member = {
      memberId,
      memberPw,
      memberName,
      memberPhone,
      memberGender,
      memberBirth,
      memberEmail,
    };

    if (
      memberId !== "" &&
      memberPw !== "" &&
      memberName !== "" &&
      memberPhone !== "" &&
      memberGender !== "" &&
      memberBirth !== "" &&
      memberEmail !== "" &&
      memberImage !== ""
    ) {
      const form = new FormData();
      form.append("memberId", memberId);
      form.append("memberPw", memberPw);
      form.append("memberName", memberName);
      form.append("memberPhone", memberPhone);
      form.append("memberGender", memberGender);
      form.append("memberBirth", memberBirth);
      form.append("memberEmail", memberEmail);
      /*
      let memberCategoryStr = "";
      for (let i = 0; i < memberCategory.length; i++) {
        memberCategoryStr = memberCategory[i] + "/";
        memberCategoryStr+=;
      }
      */
      form.append("memberCategory", memberCategory);
      form.append("profileImg", profileImg);

      axios
        .post("/member/join", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            Swal.fire("회원가입 완료!");
            navigate("/login");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  return (
    <div className="joinFrm">
      <div className="joinFrm-content">
        <JoinInputWrap
          data={memberId}
          setData={setMemberId}
          type="type"
          content="memberId"
          label="아이디"
          es=" *"
          checkMsg={checkIdMsg}
          placeholder="아이디를 입력해주세요"
          blurEvent={idCheck}
          msgClass={useId ? "check-blue" : "check-msg"}
        />
        <JoinInputWrap
          data={memberPw}
          setData={setMemberPw}
          type="password"
          content="memberPw"
          label="비밀번호"
          es=" *"
          checkMsg={checkPwMsg}
          placeholder="비밀번호를 입력해주세요"
          blurEvent={pwCheck}
          msgClass="check-msg"
        />
        <JoinInputWrap
          data={memberPwRe}
          setData={setMemberPwRe}
          type="password"
          content="memberPwRe"
          label="비밀번호 확인"
          es=" *"
          checkMsg={checkPwReMsg}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          blurEvent={pwReCheck}
          msgClass="check-msg"
        />
        <JoinInputWrap
          data={memberName}
          setData={setMemberName}
          type="type"
          content="memberName"
          label="이름"
          es=" *"
        />
        <JoinInputWrap
          data={memberPhone}
          setData={setMemberPhone}
          type="type"
          content="memberPhone"
          label="전화번호"
          es=" *"
        />

        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label>
                성별
                <span className="join-essential"> *</span>
              </label>
            </div>
            <div className="input">
              <input
                type="radio"
                value="M"
                id="male"
                name="memberGender"
                checked={memberGender === "M"}
                onChange={clickRadio}
              />
              <label htmlFor="male">남자</label>
              <input
                type="radio"
                value="F"
                id="female"
                name="memberGender"
                checked={memberGender === "F"}
                onChange={clickRadio}
              />
              <label htmlFor="female">여자</label>
            </div>
          </div>
        </div>

        <JoinInputWrap
          data={memberBirth}
          setData={setMemberBirth}
          type="type"
          content="memberBirth"
          label="생년월일"
          es=" *"
          placeholder="ex) 900101"
        />
        <JoinInputWrap
          data={memberEmail}
          setData={setMemberEmail}
          type="type"
          content="memberEmail"
          label="이메일"
          es=" *"
          checkMsg={checkEmailMsg}
          placeholder="ex) weple@weple.co.kr"
          blurEvent={emailCheck}
          msgClass="check-msg"
        />

        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label htmlFor="memberImage">
                대표 이미지
                <span className="join-essential"> *</span>
              </label>
            </div>
            <div className="input">
              <div className="join-profileImg-pre">
                {profileImg === null ? (
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

        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label htmlFor="memberImage">관심 카테고리</label>
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
                {subCategory.map((sub, index) => {
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
                    <div key={"subT" + index}>
                      <img src="/img/hashtag.png" />
                      {subT}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="join-agree-btn">
        <div>
          <Button2 text="취소" />
        </div>
        <div>
          <Button1 text="회원가입" clickEvent={join} />
        </div>
      </div>
    </div>
  );
};

const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const es = props.es;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const placeholder = props.placeholder;
  const msgClass = props.msgClass;

  return (
    <div className="join-input-wrap">
      <div>
        <div className="label">
          <label htmlFor={content}>
            {label}
            <span className="join-essential">{es}</span>
          </label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className={msgClass}>{checkMsg}</div>
    </div>
  );
};

export default JoinFrm;
