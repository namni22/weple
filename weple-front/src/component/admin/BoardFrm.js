import TextEditor from "../util/TextEditor";
import "./admin.css";
const BoardFrm = (props) => {
  
  const boardDetail = props.boardDetail;
  const setBoardDetail = props.setBoardDetail;    
    return(
        <div className="board-frm-wrap">
      <div className="board-frm-top">   
        <div className="admin-menu-title"><h1>공지등록</h1></div>     
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>              
              <tr>
              <td className="selectOption">
                  <select>
                    <option>공지사항</option>
                    <option>이벤트</option>
                    <option>FAQ</option>
                  </select>
                </td>
                <td>
                <label htmlFor="boardTitle">제목</label>
                </td>
                <td>
                
                <input type="text" placeholder="내용을 입력해 주세요"></input>
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
        
        />       
      </div>  
      <div className="board-btn-box">
       <button>등록</button>
      </div>
    </div>
  

  
    )
    
};

export default BoardFrm;