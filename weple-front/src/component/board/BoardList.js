import "./board.css";



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
                    <li>
                        <div className="board-list-title-wrap">
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
