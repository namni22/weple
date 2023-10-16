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
        console.log(myFeedList);
      })
      .catch((res) => {
        Swal.fire("실패");
      });
  }, []);

  const useFeedMore = (e) => {
    setStart(start + amount);
  };

  return (
    <div className="myFeed-wrap">
      <div className="profile-sub-content">
        <div className="myFeed-content">피드 리스트</div>
      </div>
    </div>
  );
};

export default MyFeed;
