
import axios from "axios";
import "./admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const AdminBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/board/adminList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  return (
    <div className="admin-board-wrap">
      <div className="admin-board-top">
        <div className="admin-menu-title"><h1>공지 목록</h1></div>
        <div className="admin-board-tbl">
          <table>
            <thead>
              <tr>
                <td width={"45%"} className="title-td">
                  제목
                </td>
                <td width={"15%"}>작성일</td>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board, index) => {
                return <BoardItem key={"board" + index} board={board} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-paging-wrap">
          <Pagination
            pageInfo={pageInfo}
            reqPage={reqPage}
            setReqPage={setReqPage}
          />
        </div>
      </div>
    </div>
  )

};
const BoardItem = (props) => {
  const board = props.board;
  const navigate = useNavigate();
  const [status, setStatus] = useState(board.boardStatus === 1 ? true : false);
  const boardDetail = () => {
    navigate("/board/view", { state: { boardNo: board.boardNo } });
  };
  const changeStatus = (e) => {
    const boardNo = board.boardNo;
    const checkStatus = e.target.checked;
    const boardStatus = e.target.checked ? 1 : 2;


    const obj = { boardNo, boardStatus };
    const token = window.localStorage.getItem("token");
    axios
      .post("/board/changeStatus", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {

          setStatus(checkStatus);
        } else {
          Swal.fire("변경 중 문제가 발생했습니다.");
        }
      })
      .catch((res) => {
        console.log(res);
      });
    setStatus(e.target.checked);
  };
  return (
    <tr>

      <td className="title-td" onClick={boardDetail}>
        <div>{board.boardTitle}</div>
      </td>
      <td>{board.boardDate}</td>

    </tr>
  );
};
export default AdminBoard;