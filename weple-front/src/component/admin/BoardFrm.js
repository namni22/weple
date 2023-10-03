import TextEditor from "../util/TextEditor";

const BoardFrm = (props) => {
  
  const boardDetail = props.boardDetail;
  const setBoardDetail = props.setBoardDetail;
    console.log("BoardFrm");
    return(
        <div className="board-frm-wrap">
      <div className="board-frm-top">   
        <div className="admin-menu-title">공지등록</div>     
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="boardTitle">제목</label>
                </td>
                <td>
               
                </td>
              </tr>
              
             
              
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-content-box">
      <TextEditor
          data={boardDetail}
          setData={setBoardDetail}
          url="/board/contentImg"
        />
       
      </div>
      
    </div>

    )
    
};

export default BoardFrm;