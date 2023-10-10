import { Route, Routes } from "react-router-dom";
import "./board.css";
import BoardList from "./BoardList";
import BoardView from "./BoardView";


const Board = () => {

  return (
    <div className="board-all-wrap">
      <div className="board-title"><h1>공지사항</h1></div>
      <Routes>
        <Route path="view" element={<BoardView />} />
        <Route path="*" element={<BoardList />} />
      </Routes>
    </div>
  );
};
export default Board;