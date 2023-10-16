import { Route, Routes } from "react-router-dom";
import "./board.css";
import { BoardAll, BoardEvent, BoardFaq, BoardNotice } from "./BoardList";
import { useState } from "react";
import BoardTab from "./BoardTab";



const Board = (props) => {
  const isLogin=props.isLogin;
  const id=props.id;
  const [tabs, setTabs] = useState([
    { url: "boardAll", text: "전체", active: false },
    { url: "boardNotice", text: "공지", active: false },
    { url: "boardEvent", text: "이벤트", active: false },
    { url: "boardFaq", text: "FAQ", active: false },
  ]);

  //tabs[0].active = true;

  return (
    <div className="board-all-wrap">
      <div className="board-title"><h1>공지사항</h1></div>
      <BoardTab tabs={tabs} setTabs={setTabs}/>
      <Routes>
        <Route path="boardAll" element={<BoardAll boardType = {99} tabs = {tabs} isLogin={isLogin} id={id} />} />
        <Route path="boardNotice" element={<BoardEvent boardType = {0} tabs = {tabs}/>} />
        <Route path="boardEvent" element={<BoardFaq boardType = {1} tabs = {tabs}/>} />
        {/* <Route path="boardFaq" element={<BoardNotice boardType = {2} tabs = {tabs}/>} /> */}
        <Route path="*" element={<BoardAll boardType = {99} tabs = {tabs}/>}/>
      </Routes>
    </div>
  );
};

export default Board;