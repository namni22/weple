import { useState } from "react"
import "./afterMeet.css"

const MeetInfo = ()=>{
    //임시 리뷰 배열 데이터
    const [reviewList,setReviewList]=useState([
        {img : "/img/testImg_01.png",
         userImg : "/img/testImg_01.png",
         userId : "닉네임1",
         content : "리뷰내용...1"
        },
        {img : "/img/testImg_01.png",
        userImg : "/img/testImg_01.png",
        userId : "닉네임2",
        content : "리뷰내용...2"
       },
       {img : "/img/testImg_01.png",
       userImg : "/img/testImg_01.png",
       userId : "닉네임3",
       content : "리뷰내용...3"
      },
      {img : "/img/testImg_01.png",
      userImg : "/img/testImg_01.png",
      userId : "닉네임4",
      content : "리뷰내용...4"
     }
    ])
    return(
        <div className="meetInfo-all-wrap">
            <div className="meetInfo-starRate">
                <span>평균 : </span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
            </div>
            <div className="meetInfo-review">
                {reviewList.map((review,index)=>{
                    return (
                        <ReviewList key={"review"+index}review={review}/>
                    )
                })}
            </div>
            <div className="meetInfo-content">
                모임소개.input 폼에서 불러오기
            </div>
            
        </div>
    )
}

const ReviewList = (props)=>{
    const review = props.review;
    return (
        <div className="meetInfo-reviewList-wrap">
            <div className="meetInfo-reviewList-img">
                <img src={review.img}/>
            </div>
            <div className="meetInfo-reviewList-member">
                <div className="meetInfo-reviewList-member-img">
                    <img src={review.userImg}/>
                </div>
                <div className="meetInfo-reviewList-member-id">
                    {review.userId}
                </div>
            </div>
            <div className="meetInfo-reviewList-content">
                {review.content}
            </div>
        </div>
    )
}

export default MeetInfo;