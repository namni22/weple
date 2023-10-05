import TextEditor from "../util/TextEditor";
import { Button1, Button2, Button3 } from "../util/Button";
import "./admin.css";
import Input from "../util/InputFrm";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardFrm = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDetail, setBoardDetail] = useState("");
  const [boardType, setBoardType] = useState(0);
  const navigate = useNavigate();
  const insert = () => {
    if (boardTitle !== "" && boardDetail !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardDetail", boardDetail);
      axios
        .post("/board/insert", form, {

        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            navigate("/board");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {

    }
  }


  return (
    <div className="board-frm-wrap">
      <div className="board-frm-top">
        <div className="admin-menu-title"><h1>공지등록</h1></div>
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>
              <tr>
                <td className="selectOption">
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <Select value={boardType}>
                      <MenuItem value={0}>공지사항</MenuItem>
                      <MenuItem value={1}>FAQ</MenuItem>
                      <MenuItem value={2}>이벤트</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <label htmlFor="boardTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={boardTitle}
                    setData={setBoardTitle}
                    content="boardTitle"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-content-box">
        <TextEditor
          data={boardDetail}
          setData={setBoardDetail}
          url="/board/contentImg"
        />
      </div>
      <div className="board-btn-box">
        <Button1 text="등록" clickEvent={insert}></Button1>
      </div>
    </div>



  )

};

export default BoardFrm;