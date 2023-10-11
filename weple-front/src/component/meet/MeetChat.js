import FeedComment from "../feed/FeedComment";
import { Button1 } from "../util/Button";
import "./afterMeet.css";

const MeetChat = () => {
  return (
    <>
      <div className="meetChat-chat-wrap">
        <div className="meetChat-chat">--등록된 메세지가 없습니다.--</div>
      </div>
      <div className="meetChat-all-wrap">
        <ul>
          <li className="meetChat-input-form-wrap">
            <textarea className="meetChat-input-form"></textarea>
          </li>
          <li className="meetChat-btn">
            <Button1 text={"전송"} />
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

export default MeetChat;
