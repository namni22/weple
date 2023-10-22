import { Route, Routes } from "react-router-dom";
import "./board.css";
import  BoardAll  from "./BoardList";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardModify from "./BoardModify";



const Board = (props) => {
  const token = window.localStorage.getItem("token");

  const [member, setMember] = useState({});

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("getmember : " + res.data);
        setMember(res.data);

      })
      .catch((res) => {
        console.log("fail get member : " + res.response.status);
        setMember(null);
      });
  }, []);

  //tabs[0].active = true;

  return (
    <div className="board-all-wrap">
      <div className="board-title"><h1>공지사항</h1></div>
      <Routes>
        <Route path="modify" element={<BoardModify />} />
        <Route path="*" element={<BoardAll member={member} />} />
      </Routes>
    </div>
  );
};

export default Board;