import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { Button1, Button2 } from "../util/Button";
import Swal from "sweetalert2";

const tabTypeList = [{ boardType : 99, name : "전체"}, { boardType : 0, name : "관리자"}, { boardType : 1, name : "정회원"}, { boardType : 2, name : "블랙리스트"}];
const testmap = { name : "dongmin", age : 33, name : "yeojung"};

const BoardAll = (props) => {
    const member = props.member;

    const [toggleIdx, setToggleIdx] = useState(-1);
    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [boardType, setBoardType] = useState(99);

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
            <BoardTab boardType={boardType} setBoardType={setBoardType} setReqPage={setReqPage} setToggleIdx={setToggleIdx} />
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
        if(index === toggleIdx){
            setToggleIdx(-1);
        }else{
            setToggleIdx(index);
        }
        console.log("board key : " + index);
    }
    const modify = () => {
        navigate("/board/modify", { state: { board: board } });
    }
    const deleteBoard = () => {
        Swal.fire({
            icon: "warning",
            text: "게시글을 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

        }).then((res) => {
            if (res.isConfirmed) {

                axios
                    .get("/board/delete/" + board.boardNo)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data === 1) {
                            navigate("/");
                        }
                    })
                    .catch((res) => {
                        console.log(res.response.status);
                    });
            }
        });
    }
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
                            <Button1 text="삭제" clickEvent={deleteBoard}></Button1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="board-list-title-wrap" onClick={changeToggle} >
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
    const titlestyle = {
        color: "#2D31FA",
        fontWeight: "900"
    }

    const OnClickBoardTab = (inBoardType) => {
        console.log("OnClickBoardTab : " + inBoardType);
        props.setBoardType(inBoardType);
        props.setReqPage(1);
        props.setToggleIdx(-1);
    }

    console.log("props.boardType : " + props.boardType);

    return (
        <div className="board-tab-wrap">
            {/* 클릭이벤트 걸어서 component 걸기 */}
            {tabTypeList.map((tabData, index) => {
                if(tabData.boardType === props.boardType)
                {
                    return <span className="board-active-tab" style={titlestyle} onClick={() => { OnClickBoardTab(tabData.boardType) }}> {tabData.name} </span>
                }
                else
                {
                    return <span className="board-active-tab" onClick={() => { OnClickBoardTab(tabData.boardType) }}> {tabData.name} </span>
                }            
          })}
        </div>
    )
}

export { BoardAll };
