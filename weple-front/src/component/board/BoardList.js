import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { Button2 } from "../util/Button";
import Swal from "sweetalert2";

var BoardContentList = [];





var BoardState = false;
const ToggleBoardView = (props) => {
    //const navigate = useNavigate();
    
    const board = props.board;
    const boardContent = props.boardContent;
    //console.log("boardNo : " + boardNo);
    //console.log("boardContent : " + boardContent);
    //console.log("BoardContentList : " + BoardContentList[0].boardContent);
    // const modify = () => {
    //     navigate("/board/modify", { state: { board: board } });
    //   };
    BoardState = !BoardState;
    //BoardContentList.boardList[boardNo].boardContent;
    if (BoardState) {
        var innerDiv = document.createElement('div');
        innerDiv.className = 'board-view-wrap';        
        var innerP = document.createElement('p');
        innerP.innerHTML = boardContent;

        innerDiv.appendChild(innerP);

        document.getElementById("board-list-li-wrap").appendChild(innerDiv);
    
        <div className="board-view-btn-zone">
        {/* {isLogin ? (
            member && member.memberType === 0 ? (
                member && member.memberNo === board.boardWriter ?(
                    <>
                    <Button2 text="수정" clickEvent={modify} />
                    <Button2 text="삭제"  />
                  </>
                ) : (
                    ""
                  )) : (
            ""
          )
        ) : (
          ""
        )} */}
        
      </div>
    }
    else {
        var innerDivs = document.getElementsByClassName("board-view-wrap");
        document.getElementById("board-list-li-wrap").removeChild(innerDivs[0]);
    }
}

const BoardAll = (props) => {

   
    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    let boardType = props.boardType;
    console.log("BoardAll : " + boardType);
    useEffect(() => {
        console.log("BoardAll axios : " + boardType + ", reqPage : " + reqPage);
        axios
        .get("/board/list/"+reqPage+"/"+boardType)
            .then((res) => {
                console.log(res.data);
                setBoardList(res.data.boardList);
                console.log("boardList.length : " + res.data.boardList.length);
                setPageInfo(res.data.pi);
                //BoardContentList = res.data.boardList;
                //console.log("BoardList BoardContentList : " + BoardContentList);

            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [reqPage]);

    return (
        <div>
            
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index} board={board}  />
                        })}
                        
                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                        setData = {setBoardList}
                    />
                </div>
            </div>
        </div>
    )
};

const BoardNotice = (props) => {

    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [boardType, setboardType] = useState(1);
    //var boardType = props.boardType;
    setboardType(props.boardType);
    
    useEffect(() => {
        //console.log("BoardNotice axios : " + boardType + ", reqPage : " + reqPage);
        axios
        .get("/board/list/"+reqPage+"/"+boardType)
            .then((res) => {
                console.log(res.data);
                setBoardList(res.data.boardList);
                console.log("boardList.length : " + res.data.boardList.length);
                setPageInfo(res.data.pi);
                //BoardContentList = res.data.boardList;
                //console.log("BoardList BoardContentList : " + BoardContentList);

            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [reqPage]);
    const navigate = useNavigate();
    return (
        <div>            
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index} board={board} />
                        })}
                       
                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                        setData = {setBoardList}
                    />
                </div>
            </div>
        </div>
    )
};

const BoardEvent = (props) => {

    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    var boardType = props.boardType;
    
    useEffect(() => {
        //console.log("axios : " + boardType + ", reqPage : " + reqPage);
        axios
        .get("/board/list/"+reqPage+"/"+boardType)
            .then((res) => {
                console.log(res.data);
                setBoardList(res.data.boardList);
                console.log("boardList.length : " + res.data.boardList.length);
                setPageInfo(res.data.pi);
                //BoardContentList = res.data.boardList;
                //console.log("BoardList BoardContentList : " + BoardContentList);

            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [reqPage]);
 
    return (
        <div>
            
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index} board={board} />
                        })}
                        
                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                        setData = {setBoardList}
                    />
                </div>
            </div>
        </div>
    )
};

const BoardFaq = (props) => {

    const [boardList, setBoardList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    var boardType = props.boardType;
    
    useEffect(() => {
        //console.log("axios : " + boardType + ", reqPage : " + reqPage);
        axios
        .get("/board/list/"+reqPage+"/"+boardType)
            .then((res) => {
                console.log(res.data);
                setBoardList(res.data.boardList);
                console.log("boardList.length : " + res.data.boardList.length);
                setPageInfo(res.data.pi);
                //BoardContentList = res.data.boardList;
                //console.log("BoardList BoardContentList : " + BoardContentList);

            })
            .catch((res) => {
                console.log(res.response.status);
            });
    }, [reqPage]);

    return (
        <div>
            
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id="board-list-li-wrap">
                        {boardList.map((board, index) => {
                            return <BoardItem key={"board" + index} board={board} />
                        })}
                      
                    </li>
                </ul>
                <div className="board-page">
                    <Pagination
                        reqPage={reqPage}
                        setReqPage={setReqPage}
                        pageInfo={pageInfo}
                        setData = {setBoardList}
                    />
                </div>
            </div>
        </div>
    )
};

const BoardItem = (props) => {
    // Map으로boardType :키 색깔 value
    const board = props.board;
    const isLogin=props.isLogin;
    const id=props.id;
    const style={
        backgroundColor: board.boardType === 0 ? "#2D31FA" : (board.boardType === 1 ? "#5D8BF4": "#ededed")
    }
    return (
        <div className="board-list-title-wrap" onClick={() => ToggleBoardView(board)}>
            <div className="board-list-tab" style={style}>
                {board.boardType === 0 ? "공지사항" : (board.boardType === 1 ? "이벤트" : "FAQ")}
            </div>
            <div className="board-list-title">{board.boardTitle}</div>
            <div className="board-list-date">{board.boardDate}</div>
        </div>
    );
};

export {BoardAll, BoardNotice, BoardEvent, BoardFaq};
