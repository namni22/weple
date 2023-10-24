import ReactModal from "react-modal";
import { Button1, Button2, Button3 } from "./Button";
import "./modal.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { width } from "dom7";

const ReportModal = (props) => {
  const isOpen = props.isOpen;
  const moreModalClose = props.moreModalClose;
  const onSubmit = props.onSubmit;
  const onCancel = props.onCancel;
  const isLogin = props.isLogin;
  const reportItemNo = props.reportItemNo;
  const reportMemberId = props.reportMemberId;
  const setReportTypeValue = props.setReportTypeValue;
  const reportTypeValue = props.reportTypeValue;
  const reportType = props.reportType;
  const setReportType = props.setReportType;
  const [reportContent, setReportContent] = useState("");
  const [currentVaule, setCurrentVaule] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [checkIdMsg, setCheckIdMsg] = useState("");

  const [memberId, setMemberId] = useState("");

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const [reportCategory, setReportCategory] = useState([]);
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
    console.log("가해자 : ", reportMemberId);
    console.log("신고내용 : ", reportContent);
    console.log("신고타입 : ", reportTypeValue);
    console.log("신고자 :", memberId);
    console.log("신고유형 : ", currentCategory);
    console.log("신고물번호 : ", reportItemNo);
    console.log("reportCategory : ", reportCategory);
    const token = window.localStorage.getItem("token");
    //insert에 필요한 값 1.신고타입,2신고유형,3.가해자,4.신고내용
    if (reportContent === "" || currentCategory === null) {
      Swal.fire({
        text: "신고 항목을 모두 작성해주세요",
      });
    } else {
      axios
        .post(
          "/member/report",
          {
            reportedMember: reportMemberId,
            reportType: reportTypeValue,
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
          if (res.data === 1) {
            setCurrentCategory(null);
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
            moreModalClose();
          }
        })
        .catch((res) => {});

      onSubmit();
    }
  };
  const handleClickCancel = () => {
    onCancel();
  };
  useEffect(() => {
    axios
      .get("/member/selectReportOption/" + reportTypeValue)
      .then((res) => {
        setReportCategory(res.data.reportCategory);
      })
      .catch((res) => {});
  }, []);
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
                <td>신고자</td>
                <td>{memberId}</td>
              </tr>
              <tr>
                <td> 신고 타입</td>
                <td>
                  {reportType === 0
                    ? "회원"
                    : reportType === 1
                    ? "모임"
                    : reportType === 2
                    ? "피드"
                    : reportType === 3
                    ? "후기"
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  신고 유형<sup className="report-sup">*</sup>
                </td>
                <td>
                  <select
                    className="report-tbl-select"
                    onChange={changeCategory}
                    required
                  >
                    <option value="" selected disabled hidden>
                      선택해주세요
                    </option>
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
                <td>신고 할 회원</td>
                <td>{reportMemberId}</td>
              </tr>
              <tr>
                <td>
                  신고내용<sup className="report-sup">*</sup>
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
  const feedWriter = props.feedWriter;
  const isAdmin = props.isAdmin;
  const feedNo = props.feedNo;
  const reportTypeValue = props.reportTypeValue;
  const reportType = props.reportType;
  const [memberId, setMemberId] = useState("");
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);

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
        {memberId === feedWriter ? (
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
        ) : isAdmin ? (
          <div className="modal-select">
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
        isLogin={isLogin}
        reportItemNo={feedNo}
        reportMemberId={feedWriter}
        reportTypeValue={reportTypeValue}
        reportType={reportType}
        moreModalClose={onCancel}
      />
    </ReactModal>
  );
};

export { ReportModal, MoreModal };
