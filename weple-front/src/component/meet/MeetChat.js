import { useEffect, useRef, useState } from "react";
import FeedComment from "../feed/FeedComment";
import { Button1 } from "../util/Button";
import "./afterMeet.css";
import axios from "axios";
import TextEditor from "../util/TextEditor";

const MeetChat = (props) => {
  const meet = props.myMeet;
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const [newChat, setNewChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const messages = useRef(null);
  let bool = true;
  useEffect(() => {
    messages.current.scrollIntoView();
    if (bool) {
      window.scrollTo(0, 0);
      bool = false;
    }
  }, [chat]);

  const enterInsert = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      insertChat();
      e.currentTarget.value = "";
    }
  };
  useEffect(() => {
    axios
      .get("/meet/meetChat/" + meet.meetNo)
      .then((res) => {
        setChat(res.data.meetChat);
      })
      .catch((res) => {});
  }, []);
  const token = window.localStorage.getItem("token");
  const insertChat = () => {
    console.log("전송이벤트");
    console.log(chatContent);
    if (chatContent !== "\n") {
      axios
        .post(
          "/meet/chat/" + meet.meetNo,
          { chatContent },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          const newArr = [...chat];
          newArr.push(res.data[0]);
          setChat(newArr);
          setChatContent("");
        })
        .catch((res) => {});
    }
  };
  return (
    <>
      <div className="meetChat-chat-wrap">
        {chat.map((chat, index) => {
          return <ChatItem key={"chat" + index} chat={chat} />;
        })}
        <div ref={messages}></div>
      </div>
      <div className="meetChat-all-wrap">
        <ul>
          <li className="meetChat-input-form-wrap">
            <div className="meetChat-textEditor">
              <textarea
                onChange={(e) => {
                  const changeValue = e.currentTarget.value;
                  setChatContent(changeValue);
                }}
                onKeyPress={enterInsert}
              >
                {chatContent}
              </textarea>
            </div>
            <div className="meetChat-btn">
              <Button1 text={"전송"} clickEvent={insertChat} />
            </div>
          </li>
        </ul>
        <div className="meetChat-span">
          <span>
            통신예절에 어긋나는 상업적인 글, 타 사이트에 관련된 글은 관리자에
            의해 사전 통보없으 삭제될 수 있습니다.
          </span>
        </div>
      </div>
    </>
  );
};
const ChatItem = (props) => {
  const chat = props.chat;

  /*
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);  
  */

  return (
    <ul>
      <li>
        <div className="meetChat-chat-img">
          {chat.memberImage === null ? <img src="/img/testImg_01.png" /> : ""}
        </div>
      </li>
      <li>
        <div className="meetChat-chat-writer">
          <span>{chat.memberId}</span>
          <sub>{chat.chatDate}</sub>
        </div>
        <div className="meetChat-chat-content">{chat.chatContent}</div>
      </li>
      <li></li>
    </ul>
  );
};
export default MeetChat;
