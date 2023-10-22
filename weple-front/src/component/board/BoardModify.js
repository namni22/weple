import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import TextEditor from "../util/TextEditor";
import { Button1, Button2 } from "../util/Button";
import Input from "../util/InputFrm";
import { useState } from "react";
import Swal from "sweetalert2";
import "./board.css";

const BoardModify = () => {
    const location = useLocation();
    const board = location.state.board;
    //console.log(board);

    const [boardTitle, setBoardTitle] = useState(board.boardTitle);
    const [boardContent, setBoardContent] = useState(board.boardContent);
    const [boardType, setBoardType] = useState(board.boardType);
    // const [delFileNo, setDelFileNo] = useState([]); //삭제파일용
    const navigate = useNavigate();
    const modify = () => {
   
        if (boardContent !== "" && boardTitle !== 0) {
            const form = new FormData();
            form.append("boardTitle", boardTitle);
            form.append("boardContent", boardContent);
            form.append("boardNo",board.boardNo);          
            form.append("boardType",boardType);   
            console.log(boardType);
            const token = window.localStorage.getItem("token");
            axios
                .post("/board/modify", form, {
                    headers: {
                        contentType: "multipart/form-data",
                        processData: false,
                        Authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    if (res.data === 1) {
                        Swal.fire({
                            icon: "success",
                            text: "공지 수정 완료",
                            confirmButtonText: "확인",
                          }); 
                        navigate("/board");
                    }
                })
                .catch((res) => {
                    //console.log("boardmodify" + res.response.status);
                    Swal.fire("공지 수정 실패");
                });
        } else {
            Swal.fire("제목, 내용 입력 필수입니다");
        }


    };
   
    const options = ["공지사항", "이벤트", "FAQ"];
    const clickChange = (event) => {
        setBoardType(event.target.value);    
      };
    return (
        <div className="board-frm-wrap">
            <div className="board-frm-top">
                <div className="admin-menu-title"><h3>공지 수정</h3></div>
                <div className="board-info">
                    <table className="board-info-tbl">
                        <tbody>
                            <tr>
                                <td className="selectOption">
                                <select value={boardType} onChange={clickChange} >
                                    {options.map((option, index) => {
                                        return <option value={index} key={"option" + index}> {option} </option>
                                    })}
                                </select>
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
                    <Button2 text="취소" ></Button2>
                </div>
                <div>
                    <Button1 text="수정" clickEvent={modify}></Button1>

                </div>
            </div>

        </div >

    );
}
export default BoardModify;