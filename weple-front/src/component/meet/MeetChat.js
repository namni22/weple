import { useEffect, useRef, useState } from "react";
import FeedComment from "../feed/FeedComment";
import { Button1 } from "../util/Button";
import "./afterMeet.css";
import axios from "axios";
import TextEditor from "../util/TextEditor";

const MeetChat = (props) => {
  const meet = props.myMeet;
  console.log(meet.meetNo);
  console.log(meet);

  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const [newChat, setNewChat] = useState([]);
  const [chat, setChat] = useState([]);
  //const [data, setData] = useState({});
  const [chatContent, setChatContent] = useState("");
  useEffect(() => {
    axios
      .get("/meet/meetChat/" + meet.meetNo)
      .then((res) => {
        console.log(res.data);
        setChat(res.data.meetChat);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  const token = window.localStorage.getItem("token");
  const insertChat = () => {
    console.log("전송이벤트");
    console.log(chatContent);
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
        console.log(res.data);
        //setNewChat(res.data.list);
        // console.log(chat);
        //  const newArr = [...chat];
        // newArr.push(res.data.list);
        // setChat(newArr);
        const newArr = [...chat];
        console.log(newArr);
        newArr.push(res.data[0]);
        console.log(newArr);
        setChat(newArr);
        console.log(chat);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <>
      <div className="meetChat-chat-wrap">
        {chat.map((chat, index) => {
          return <ChatItem key={"chat" + index} chat={chat} />;
        })}
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
  const messages = useRef(HTMLUListElement);
  const scrollToBottom = () => {
    messages.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

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
      <li>
        <div ref={messages}></div>
      </li>
    </ul>
  );
};
export default MeetChat;
