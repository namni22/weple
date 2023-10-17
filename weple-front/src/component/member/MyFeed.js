import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
        console.log(res.data);
        res.data.forEach((item) => {
          myFeedList.push(item);
          setMyFeedList([...myFeedList]);
        });
      })
      .catch((res) => {
        Swal.fire("실패");
      });
  }, [memberId]);

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
