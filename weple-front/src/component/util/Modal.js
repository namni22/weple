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
  const [reportTypeValue, setReportTypeValue] = useState(0);
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
    //setReportTypeValue(newValue);
    axios
      .get("/member/selectReportOption/" + newValue)
      .then((res) => {
        console.log(res.data);
        console.log(reportType.value);
        setReportCategory(res.data.reportCategory);
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
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  };
  const handleClickSubmit = () => {
    console.log("모달 확인 클릭시 이벤트발생");
    Swal.fire({
      title: "신고가 완료되었습니다.",
      text: "신고 처리 완료",
      icon: "success",
    });

    onSubmit();
  };
  const handleClickCancel = () => {
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
  }, [reportType]);
  /*
   */
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
                  <select>
                    {reportType.map((type, index) => {
                      return (
                        <option
                          key={"type" + index}
                          value={type.value}
                          onChange={changeValue}
                        >
                          {type.text}
                        </option>
                      );
                    })}
                    {/*
                    <option value={0}>후기</option>
                    <option value={1}>피드</option>
                    <option value={2}>모임</option>
                    <option value={3}>후기</option>
                     */}
                  </select>
                </td>
              </tr>
              <tr>
                <td>신고 유형</td>
                <td>
                  <select>
                    {reportCategory.map((category, index) => {
                      return (
                        <option
                          key={"reportCategory" + index}
                          value={category.reportCategoryNo}
                        >
                          {category.reportCategoryContent}
                          {/*
                           */}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>가해자</td>
                <td>
                  <input></input>
                </td>
              </tr>
              <tr>
                <td>신고내용</td>
                <td>
                  <textarea className="modal-tbl-textarea"></textarea>
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
