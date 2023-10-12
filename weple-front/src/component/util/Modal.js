import ReactModal from "react-modal";
import { Button2, Button3 } from "./Button";
import "./modal.css";
import { useState } from "react";
const MyModal = (props) => {
  const isOpen = props.isOpen;
  const onSubmit = props.onSubmit;
  const onCancel = props.onCancel;
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
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const handleClickSubmit = () => {
    onSubmit();
  };
  const handleClickCancel = () => {
    onCancel();
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
                <td>신고자ID</td>
              </tr>
              <tr>
                <td>신고 타입</td>
                <td>
                  <select>
                    <option value={0}>후기</option>
                    <option value={1}>피드</option>
                    <option value={2}>모임</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>신고 유형</td>
                <td>
                  <select>
                    <option value={0}>폭언,욕설</option>
                    <option value={1}>음란물유포</option>
                    <option value={2}>부적절한 태도</option>
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
                <textarea className="modal-tbl-textarea"></textarea>
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
  console.log(id);
  console.log(feedWriter);
  const [reportIsOpen, setReportIsOpen] = useState(false);
  const reportCancel = () => {
    setReportIsOpen(false);
  };
  const handleClickSubmit = () => {
    setReportIsOpen(false);
  };
  const reportBtn = () => {
    setReportIsOpen(true);
    onCancel();
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
  const handleClickCancel = () => {
    console.log("취소!");
    onCancel();
  };
  console.log("222 : " + isOpen);
  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
    >
      <div className="more-modal-wrap">
        {!isLogin ? (
          <div>로그인이 필요한 기능입니다</div>
        ) : id == feedWriter ? (
          <div className="modal-select writer">
            <div>
              <span className="material-icons" onClick={modifyEvent}>
                drive_file_rename_outline
              </span>
              <Button3 text="수정" />
            </div>
            <div>
              <span className="material-icons" onClick={deleteEvent}>
                delete
              </span>
              <Button3 text="삭제" />
            </div>
          </div>
        ) : (
          <div className="modal-select">
            <div>
              <span className="material-icons" onClick={reportBtn}>
                error_outline
              </span>
              <Button3 text="신고" />
            </div>
          </div>
        )}

        <div className="more-modal-close">
          <span className="material-icons" onClick={handleClickCancel}>
            close
          </span>
        </div>
      </div>
      <MyModal
        isOpen={reportIsOpen}
        onCancel={reportCancel}
        onSubmit={handleClickSubmit}
      />
    </ReactModal>
  );
};

export { MyModal, MoreModal };
