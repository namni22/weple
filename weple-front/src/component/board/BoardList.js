import "./board.css";

var BoardState = false;

const ToggleBoardView=()=>{
    BoardState = !BoardState;

    if(BoardState)
    {
        var innerDiv = document.createElement('div');
        innerDiv.className = 'board-view-wrap';
    
        var innerP = document.createElement('p');
        innerP.innerText = '공지사항 내용입니다.';
    
        innerDiv.appendChild(innerP);
    
        document.getElementById("board-list-wrap").appendChild(innerDiv);
    }
    else
    {
        var innerDivs = document.getElementsByClassName("board-view-wrap");        
        document.getElementById("board-list-wrap").removeChild(innerDivs[0]);
    }
}

const BoardList = () => {
    return(
        <div>        
            <div className="board-tab-wrap">
                <span>전체</span>
                <span>공지</span>
                <span>이벤트</span>
                <span>자주묻는질문</span>
            </div>
            <div className="board-list-wrap">
                <ul className="board-list">
                    <li id = "board-list-wrap">
                        <div className="board-list-title-wrap" onClick={ToggleBoardView}>
                            <div className="board-list-tab">공지</div>
                            <div className="board-list-title">공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목공지제목v</div>
                            <div className="board-list--date">2023-09-21</div>                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
    
};
export default BoardList;
