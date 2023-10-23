import { useEffect, useRef, useState } from "react";
import FeedComment from "../feed/FeedComment";
import { Button1 } from "../util/Button";
import "./afterMeet.css";
import axios from "axios";
import TextEditor from "../util/TextEditor";

const MeetChat = (props) => {
  const meet = props.myMeet;
  const [chat, setChat] = useState([]);
  const [chatContent, setChatContent] = useState("");
  const messages = useRef(null);
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMemberId(res.data.memberId);
      })
      .catch((res) => {});
  }, []);
  const enterInsert = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      insertChat();
      e.currentTarget.value = null;
    }
  };
  useEffect(() => {
    axios
      .get("/meet/meetChat/" + meet.meetNo)
      .then((res) => {
        setChat(res.data.meetChat);
      })
      .catch((res) => {});
  }, [props]);
  const token = window.localStorage.getItem("token");
  const insertChat = () => {
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
          console.log(res.data);
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
        <div className="meetChat-inner">
          {chat.map((chat, index) => {
            return (
              <ChatItem
                key={"chat" + index}
                chat={chat}
                memberId={memberId}
                messages={messages}
              />
            );
          })}
        </div>
      </div>
      <div className="meetChat-all-wrap">
        <ul>
          <li className="meetChat-input-form-wrap">
            <div className="meetChat-textEditor">
              <textarea
                placeholder="내용을 입력하세요"
                className="textarea"
                value={chatContent}
                onChange={(e) => {
                  const changeValue = e.currentTarget.value;

                  setChatContent(changeValue);
                }}
                onKeyPress={enterInsert}
              ></textarea>
            </div>
            <div className="meetChat-btn">
              <Button1 text={"전송"} clickEvent={insertChat} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
const ChatItem = (props) => {
  const chat = props.chat;
  const memberId = props.memberId;
  const messages = props.messages;
  const [bool, setBool] = useState(true);

  useEffect(() => {
    messages.current.scrollIntoView();
    if (bool) {
      window.scrollTo(0, 0);
      setBool(false);
    }
  }, [chat]);
  return (
    <div
      className={
        chat.memberId === memberId ? "meetChat-item mymsg" : "meetChat-item"
      }
    >
      {chat.memberId === memberId ? (
        <></>
      ) : (
        <>
          <div className="meetChat-img">
            {chat.memberImage === null ? (
              <img src="/img/testImg_01.png" />
            ) : (
              <img src={chat.memberImage} />
            )}
          </div>
        </>
      )}

      <div className="meetChat-box">
        {chat.memberId === memberId ? (
          <></>
        ) : (
          <span className="meetChat-writer">{chat.memberId}</span>
        )}
        <p className="meetChat-msg">{chat.chatContent}</p>
        <span className="meetChat-time">{chat.chatDate}</span>
      </div>
      <div ref={messages}></div>
    </div>
  );
};
export default MeetChat;
