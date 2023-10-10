import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";


var BoardState = false;
const ToggleBoardView = () => {

    BoardState = !BoardState;

    if (BoardState) {
        var innerDiv = document.createElement('div');
        innerDiv.className = 'board-view-wrap';

        var innerP = document.createElement('p');
        innerP.innerText = '공지사항 내용입니다.';

        innerDiv.appendChild(innerP);
        document.getElementById("board-list-li-wrap").appendChild(innerDiv);
    }
    else {
        var innerDivs = document.getElementsByClassName("board-view-wrap");
        document.getElementById("board-list-li-wrap").removeChild(innerDivs[0]);
    }
}


const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    useEffect(() => {
        axios
            .get("/board/list/" + reqPage)
            .then((res) => {
                console.log(res.data);
                setBoardList(res.data.boardList);
                setPageInfo(res.data.pi);
            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [reqPage]);
    const navigate = useNavigate();
    return (
        <div>
            <div className="board-tab-wrap">
                <span>전체</span>
                <span>공지</span>
                <span>이벤트</span>
                <span>자주묻는질문</span>
            </div>
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index} board={board} />
                        })}
                        {/* <div className="board-list-title-wrap" onClick={ToggleBoardView}>
                            <div className="board-list-tab">공지</div>
                            <div className="board-list-title">공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목v</div>
                            <div className="board-list-date">2023-09-21</div>

                        </div> */}
                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                    />
                </div>
            </div>
        </div>
    )
};
const BoardItem = (props) => {
    const board = props.board;

    return (
        <div className="board-list-title-wrap" onClick={ToggleBoardView}>
            <div className="board-list-tab">
                {board.boardType === 0 ? "공지사항" : (board.boardType === 1 ? "이벤트" : "FAQ")}
            </div>
            <div className="board-list-title">{board.boardTitle}</div>
            <div className="board-list-date">{board.boardDate}</div>
        </div>
    );
};
export default BoardList;
