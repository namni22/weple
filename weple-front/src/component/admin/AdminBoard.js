import axios from "axios";
import "./admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";

const AdminBoard = () => {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/board/adminList/" + reqPage)
      .then((res) => {
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
        <div className="admin-menu-title">
          <h1>공지 목록</h1>
        </div>
        <div className="admin-board-tbl">
          <table>
            <thead>
              <tr>
                <td width={"50%"} className="title-td">
                  제목
                </td>
                <td width={"25%"}>작성일</td>
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
  );
};
const BoardItem = (props) => {
  const board = props.board;
  const navigate = useNavigate();
  const boardDetail = () => {};
};
export default AdminBoard;
