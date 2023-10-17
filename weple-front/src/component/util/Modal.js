import ReactModal from "react-modal";
import { Button2, Button3 } from "./Button";
import "./modal.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ReportModal = (props) => {
  const isOpen = props.isOpen;
  const onSubmit = props.onSubmit;
  const onCancel = props.onCancel;
  const memberId = props.memberId;
  const reportItemNo = props.reportItemNo;
  const [reportedMember, setReportedMember] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportTypeValue, setReportTypeValue] = useState(0);
  const [currentVaule, setCurrentVaule] = useState();
  const [currentCategory, setCurrentCategory] = useState("");
  const [reportType, setReportType] = useState([
    {
      value: 0,
      text: "회원",
    },
    {
      value: 1,
      text: "모임",
    },
    {
      value: 2,
      text: "피드",
    },
    {
      value: 3,
      text: "후기",
    },
  ]);
  const [reportCategory, setReportCategory] = useState([]);

  const changeValue = (e) => {
    const newValue = e.currentTarget.value;
    console.log("신고타입 전 : ", newValue);
    setReportTypeValue(newValue);
    console.log("신고타입 후 : ", reportTypeValue);
    axios
      .get("/member/selectReportOption/" + newValue)
      .then((res) => {
        console.log(res.data);
        console.log(reportType.value);
        setReportCategory(res.data.reportCategory);
        setCurrentVaule(newValue);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "40px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  };
  const handleClickSubmit = (e) => {
    console.log(" 확인 클릭시 이벤트발생");
    console.log("가해자 : ", reportedMember);
    console.log("신고내용 : ", reportContent);
    console.log("신고타입 : ", currentVaule);
    console.log("신고자 :", memberId);
    console.log("신고유형 : ", currentCategory);
    console.log("신고물번호 : ", reportItemNo);
    const token = window.localStorage.getItem("token");
    //insert에 필요한 값 1.신고타입,2신고유형,3.가해자,4.신고내용
    if (reportContent === "") {
      Swal.fire({
        text: "신고 항목을 모두 작성해주세요",
      });
    } else {
      axios
        .post(
          "/member/report",
          {
            reportedMember: reportedMember,
            reportType: currentVaule,
            reportContent: reportContent,
            reportCategoryNo: currentCategory,
            reportMember: memberId,
            reportItemNo: reportItemNo,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            Swal.fire({
              title: "신고가 완료되었습니다.",
              text: "신고 처리 완료",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "신고가 실패되었습니다.",
              text: "신고 처리 실패",
              icon: "error",
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });

      onSubmit();
    }
  };
  const handleClickCancel = () => {
    const newArr2 = 0;
    console.log("취소이벤트 : ", reportTypeValue);
    console.log("newArr2 : ", newArr2);
    setReportTypeValue(newArr2);
    console.log("취소이벤트 후 : ", reportTypeValue);
    onCancel();
  };
  useEffect(() => {
    axios
      .get("/member/selectReportOption/" + reportTypeValue)
      .then((res) => {
        console.log(res.data);
        console.log(reportType.value);
        setReportCategory(res.data.reportCategory);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reportTypeValue]);
  const changeCategory = (e) => {
    const newCategory = e.currentTarget.value;
    setCurrentCategory(newCategory);
  };
  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div className="modal-all-wrap">
        <div className="modal-title">
          <h1>WEPLE 신고센터</h1>
        </div>
        <div className="modal-content-wrap">
          <table className="modal-tbl">
            <tbody>
              <tr>
                <td width="20%">신고자</td>
                <td>{memberId}</td>
              </tr>
              <tr>
                <td>신고 타입</td>
                <td>
                  <select onChange={changeValue}>
                    {reportType.map((type, index) => {
                      return (
                        <option key={"type" + index} value={type.value}>
                          {type.text}
                          {type.value}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>신고 유형</td>
                <td>
                  <select onChange={changeCategory}>
                    {reportCategory.map((category, index) => {
                      return (
                        <option
                          key={"reportCategory" + index}
                          value={category.reportCategoryNo}
                        >
                          {category.reportCategoryContent}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  신고 할 회원<sup>*</sup>
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      const changeMemberValue = e.currentTarget.value;
                      setReportedMember(changeMemberValue);
                    }}
                  ></input>

                  <p>1.신고 타입이 회원일 경우: 신고할 회원 아이디</p>
                  <p>2.신고 타입이 모임일 경우: 모임장 회원 아이디</p>
                  <p>3.신고 타입이 피드일 경우: 피드를 작성한 회원 아이디</p>
                  <p>4.신고 타입이 후기일 경우: 후기를 작성한 회원 아이디</p>
                </td>
              </tr>
              <tr>
                <td>
                  신고내용<sup>*</sup>
                </td>
                <td>
                  <textarea
                    className="modal-tbl-textarea"
                    onChange={(e) => {
                      const changeContentValue = e.currentTarget.value;
                      setReportContent(changeContentValue);
                    }}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-btn-wrap">
          <Button2 clickEvent={handleClickSubmit} text={"확인"}></Button2>
          <Button2 clickEvent={handleClickCancel} text={"취소"}></Button2>
        </div>
      </div>
    </ReactModal>
  );
};

const MoreModal = (props) => {
  const isOpen = props.isOpen;
  const onCancel = props.onCancel;
  const deleteEvent = props.deleteEvent;
  const modifyEvent = props.modifyEvent;
  const isLogin = props.isLogin;
  const id = props.id;
  const feedWriter = props.feedWriter;

  const [reportIsOpen, setReportIsOpen] = useState(false);
  const reportCancel = () => {
    setReportIsOpen(false);
  };
  const reportSubmit = () => {
    setReportIsOpen(false);
  };
  const reportBtn = (e) => {
    setReportIsOpen(true);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
    >
      <div className="more-modal-wrap">
        {id === feedWriter ? (
          <div className="modal-select writer">
            <div>
              <span className="material-icons">drive_file_rename_outline</span>
              <Button3 text="수정" clickEvent={modifyEvent} />
            </div>
            <div>
              <span className="material-icons">delete</span>
              <Button3 text="삭제" clickEvent={deleteEvent} />
            </div>
          </div>
        ) : (
          <div className="modal-select">
            <div>
              <span className="material-icons">error_outline</span>
              <Button3 text="신고" clickEvent={reportBtn} />
            </div>
          </div>
        )}

        <div className="more-modal-close" onClick={onCancel}>
          <span className="material-icons">close</span>
        </div>
      </div>
      <ReportModal
        isOpen={reportIsOpen}
        onCancel={reportCancel}
        onSubmit={reportSubmit}
      />
    </ReactModal>
  );
};

export { ReportModal, MoreModal };
