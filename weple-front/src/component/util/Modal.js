import ReactModal from "react-modal";
import { Button1, Button2 } from "./Button";
import "./modal.css";
import { color } from "@mui/system";
const MyModal = ({ isOpen, onSubmit, onCancel, memberId }) => {
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
      backgroundColor: "rgba(0, 0, 0, 0.4)",
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

export default MyModal;
