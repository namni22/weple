import TextEditor from "../util/TextEditor";
import { Button1, Button2, Button3 } from "../util/Button";
import "./admin.css";
import Input from "../util/InputFrm";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardFrm = (props) => {
  const isLogin= props.isLogin;
  
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  var getType;
  const [boardType, setBoardType] = useState();
 
 

  const navigate = useNavigate();

  console.log("boardContent : " + boardContent);

  const insert = () => {

    if (boardTitle !== "" && boardContent !== "") {

      //console.log(boardTitle);
      //console.log(boardContent);
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);     
      form.append("boardType",boardType)
      //console.log(getBoardType);
      const token = window.localStorage.getItem("token");
      axios
        .post("/board/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,

          }
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data > 0) {
            navigate("/board");
          }
        })
        .catch((res) => {
          // console.log(res.response.status);
        });
    } else {

    }
  }
  const reset=()=>{
    
  }
  const handleChange = (event) => {
    setBoardType(event.target.value);
    console.log(boardType);
  }

  return (
    <div className="board-frm-wrap">
      <div className="board-frm-top">
        <div className="admin-menu-title"><h1>공지 등록</h1></div>
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>
              <tr>
                <td className="selectOption">
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <Select onChange={handleChange}>
                      <MenuItem value={0}>공지사항</MenuItem>
                      <MenuItem value={1}>이벤트</MenuItem>
                      <MenuItem value={2}>FAQ</MenuItem>
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
          data={boardContent}
          setData={setBoardContent}
          url="/board/contentImg"
        />
      </div>
      <div className="board-btn-box">
        <div>
        <Button2 text="취소" clickEvent={reset}></Button2>
        </div>
        <div>
        <Button1 text="등록" clickEvent={insert}></Button1>        
      </div>
      </div>
      
    </div >



  )

};

export default BoardFrm;