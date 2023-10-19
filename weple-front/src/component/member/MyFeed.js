import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button1 } from "../util/Button";

const MyFeed = (props) => {
  const memberId = props.memberId;
  const [myFeedList, setMyFeedList] = useState([]);
  const [start, setStart] = useState(1);

  // 내가 쓴 피드 가져오기(아이디로)
  const amount = 9;
  useEffect(() => {
    const end = start + amount - 1;
    axios
      .get("/member/myFeedList/" + start + "/" + end + "/" + memberId)
      .then((res) => {
        console.log("데이터 :  " + res.data);
        if (res.data !== null) {
          res.data.forEach((item) => {
            myFeedList.push(item);
            setMyFeedList([...myFeedList]);
          });
        } else {
          console.log("얘는 왜 안 찍혀");
          Swal.fire("내 피드가 없습니다. 피드를 작성해보세요.");
        }
      })
      .catch((res) => {
        console.log("오류");
      });
  }, [memberId, start]);

  const useFeedMore = (e) => {
    setStart(start + amount);
  };

  return (
    <div className="myFeed-wrap">
      <div className="profile-sub-content">
        <div className="myFeed-content">
          {myFeedList.map((myFeed, index) => {
            return <MyFeedItem key={"myFeed" + index} myFeed={myFeed} />;
          })}
        </div>
        <div className="myfeed-content-more-btn">
          <Button1 text="더보기" dValue={1} clickEvent={useFeedMore} />
        </div>
      </div>
    </div>
  );
};

const MyFeedItem = (props) => {
  const myFeed = props.myFeed;
  const myFeedImg = myFeed.imageList;

  return (
    <div>
      <div className="myFeed-item">
        {myFeed.imageList === null ? (
          <img src="/img/testImg_01.png" />
        ) : (
          <img src={"/feed/" + myFeedImg[0].fimageName} />
        )}
      </div>
    </div>
  );
};

export default MyFeed;
