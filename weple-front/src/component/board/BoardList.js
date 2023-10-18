import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
import Swal from "sweetalert2";

// var BoardState = false;
// const ToggleBoardView = (props) => {
//     // const navigate = useNavigate();

//     const board = props.board;
//     const boardContent = props.boardContent;
//     const member = props.member;

//     const modify = () => {
//         // navigate("/board/modify", { state: { board: board } });
//       };
//     BoardState = !BoardState;

//     console.log("ToggleBoardView member", member !== null + " _ " + member);

//     if (BoardState) {
//         var innerDiv = document.createElement('div');
//         innerDiv.className = 'board-view-wrap';        
//         var innerP = document.createElement('p');
//         innerP.innerHTML = boardContent;

//         innerDiv.appendChild(innerP);

//         document.getElementById("board-list-li-wrap").appendChild(innerDiv);

//         <div className="board-view-btn-zone">
//         {
//           member && member.memberNo === board.boardWriter ? (
//             <>
//               <Button2 text="수정" />
//               <Button2 text="삭제" />
//             </>
//           ) : (
//             <>
//               <Button2 text="ff" />
//               <Button2 text="dd" />
//             </>
//           )
//         }        
//         </div>
//     }
//     else {
//         var innerDivs = document.getElementsByClassName("board-view-wrap");
//         document.getElementById("board-list-li-wrap").removeChild(innerDivs[0]);
//     }
// }

const BoardAll = (props) => {
    const member = props.member;

    const [toggleIdx, setToggleIdx] = useState(-1);
    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [boardType, setBoardType] = useState(99);

    console.log("BoardAll : " + boardType);

    useEffect(() => {
        console.log("BoardAll axios : " + boardType + ", reqPage : " + reqPage);
        axios
            .get("/board/list/" + reqPage + "/" + boardType)
            .then((res) => {
                console.log("axios result");
                setBoardList(res.data.boardList);
                setPageInfo(res.data.pi);
            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [boardType, reqPage]);

    return (
        <div>
            <BoardTab setBoardType={setBoardType} setReqPage={setReqPage} />
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index}
                                board={board}
                                member={member}
                                toggleIdx={toggleIdx}
                                setToggleIdx={setToggleIdx}
                                index={index} />
                        })}

                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                        setData={setBoardList}
                    />
                </div>
            </div>
        </div>
    )
};

const BoardItem = (props) => {
    // Map으로boardType :키 색깔 value
    const board = props.board;
    const member = props.member;
    const toggleIdx = props.toggleIdx;
    const setToggleIdx = props.setToggleIdx;
    const navigate = useNavigate();
    const index = props.index;

    const style = {
        backgroundColor: board.boardType === 0 ? "#2D31FA" : (board.boardType === 1 ? "#5D8BF4" : "#ededed")
    }

    const changeToggle = (e) => {
        setToggleIdx(index);

        console.log("board key : " + index);
    }
    const modify = () => {
        navigate("/board/modify", { state: { board: board } });
    }
    console.log("boardList 1018 : ", board)
    if (index === toggleIdx) {
        return (
            <div>
                <div className="board-list-title-wrap" onClick={changeToggle}>
                    <div className="board-list-tab" style={style}>
                        {board.boardType === 0 ? "공지사항" : (board.boardType === 1 ? "이벤트" : "FAQ")}
                    </div>
                    <div className="board-list-title">{board.boardTitle}</div>
                    <div className="board-list-date">{board.boardDate}</div>
                </div>
                <div>
                    <div className="board-list-content" dangerouslySetInnerHTML={{ __html: board.boardContent }}>
                    </div>
                    <div className="boardlist-btn-box">
                        <div>
                            <Button2 text="수정" clickEvent={modify}></Button2>
                        </div>
                        <div>
                            <Button1 text="삭제"></Button1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="board-list-title-wrap" onClick={changeToggle}>
                <div className="board-list-tab" style={style}>
                    {board.boardType === 0 ? "공지사항" : (board.boardType === 1 ? "이벤트" : "FAQ")}
                </div>
                <div className="board-list-title">{board.boardTitle}</div>
                <div className="board-list-date">{board.boardDate}</div>
            </div>
        );
    }
};

const BoardTab = (props) => {
    const OnClickBoardTab = (inBoardType) => {
        props.setBoardType(inBoardType);
        props.setReqPage(1);
    }

    return (
        <div className="board-tab-wrap">
            {/* 클릭이벤트 걸어서 component 걸기 */}

            <span className="board-active-tab" onClick={() => { OnClickBoardTab(99) }}>전체</span>
            <span className="board-active-tab" onClick={() => { OnClickBoardTab(0) }}>공지</span>
            <span className="board-active-tab" onClick={() => { OnClickBoardTab(1) }}>이벤트</span>
            <span className="board-active-tab" onClick={() => { OnClickBoardTab(2) }}>자주묻는질문</span>
        </div>
    )
}

export { BoardAll };
