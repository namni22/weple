import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyFeed from "./MyFeed";
import { Button2, Button3 } from "../util/Button";
import { ReportModal } from "../util/Modal";
import Swal from "sweetalert2";

const MemberProfile = (props) => {
  const location = useLocation();
  const memberId = location.state.memberId;
  const userId = props.memberId;
  const m = { memberId };
  const [subCategory, setSubCategory] = useState([]);
  const [member, setMember] = useState({});
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [myCategory, setMyCategory] = useState([]);
  const token = window.localStorage.getItem("token");
  const [isOpen, setOpen] = useState(false);
  const [reportTypeValue, setReportTypeValue] = useState(0);
  const [reportType, setReportType] = useState(0);
  const isLogin = props.isLogin;

  const reportEvent = () => {
    if (userId === memberId) {
      Swal.fire({
        text: "본인은 신고할 수 없습니다",
      });
    } else {
      setOpen(true);
    }
  };

  const handleClickSubmit = () => {
    setOpen(false);
  };

  const handleClickCancel = () => setOpen(false);

  useEffect(() => {
    axios
      .get("/member/subcategory")
      .then((res) => {
        res.data.forEach((item) => {
          subCategory.push(item);
          setSubCategory([...subCategory]);
        });
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [subCategory]);

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

  useEffect(() => {
    axios
      .post("/member/getMemberInfo", m, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        // 회원이 선택한 카테고리 번호 문자열 , 기준으로 split
        // memberCategory가 현재 object로 생성된 string타입이어서 new String
        const data = res.data;
        const myCategoryNo = new String(data.memberCategory);
        const myCategoryNoList = myCategoryNo.split(",");
        myCategoryNoList.forEach((item) => {
          myCategory.push(item);
        });
        setMyCategory([...myCategory]);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [memberId]);
  return (
    <>
      <div className="profile-wrap">
        <div className="profile-top">
          <div className="profile-img">
            {member.memberImage !== null ? (
              <img src={"/member/" + member.memberImage} />
            ) : (
              <img src="/img/testImg_01.png" />
            )}
          </div>
          <div className="modifyAndLogout">
            <Button3 text="신고" clickEvent={reportEvent} />
          </div>
          <div className="profile-info">
            <div className="name">{member.memberName}</div>
          </div>
          <div className="like">{member.memberLike}˚C</div>
          <div className="prefer">
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
        <div className="profile-myFeed">
          <MyFeed memberId={memberId} />
        </div>
      </div>
      <ReportModal
        isOpen={isOpen}
        onSubmit={handleClickSubmit}
        onCancel={handleClickCancel}
        isLogin={true}
        reportItemNo={member.memberNo}
        reportMemberId={member.memberId}
        reportTypeValue={reportTypeValue}
        setReportTypeValue={setReportTypeValue}
        reportType={reportType}
        setReportType={setReportType}
      />
    </>
  );
};

export default MemberProfile;
