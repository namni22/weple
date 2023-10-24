import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FeedComment = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
      width: "600px",
      overflow: "inherit",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const feedNo = props.feedNo;
  const isOpen = props.isOpen;
  const closeComent = props.closeComent;
  const isLogin = props.isLogin;
  const rcmId = props.rcmId;
  const setRcmId = props.setRcmId;
  const fCommentRefNo = props.fCommentRefNo;
  const setFCommentRefNo = props.setFCommentRefNo;
  const [commentList, setCommentList] = useState([]);
  const [fCommentContent, setFCommentContent] = useState("");
  const [memberId, setMemberId] = useState();
  const [memberImage, setMemberImage] = useState("");
  const [load, setLoad] = useState(0); //useEffect용
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const memberGrade = props.memberGrade;

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberId(res.data.memberId);
          setMemberImage(res.data.memberImage);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get("/feed/comment/list/" + feedNo)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [load]);

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div className="commment-modal-wrap">
        <div className="feed-title">
          COMMENT
          <span className="material-icons" onClick={closeComent}>
            close
          </span>
        </div>
        <div>
          <CommentWrap
            isLogin={isLogin}
            feedNo={feedNo}
            commentList={commentList}
            fCommentContent={fCommentContent}
            setFCommentContent={setFCommentContent}
            fCommentRefNo={fCommentRefNo}
            setFCommentRefNo={setFCommentRefNo}
            rcmId={rcmId}
            setRcmId={setRcmId}
            load={load}
            setLoad={setLoad}
            memberId={memberId}
            memberImage={memberImage}
            loadList={loadList}
            setLoadList={setLoadList}
            memberGrade={memberGrade}
          />
        </div>
      </div>
    </ReactModal>
  );
};

const CommentWrap = (props) => {
  const isLogin = props.isLogin;
  const feedNo = props.feedNo;
  const commentList = props.commentList;
  const fCommentContent = props.fCommentContent;
  const setFCommentContent = props.setFCommentContent;
  const fCommentRefNo = props.fCommentRefNo;
  const setFCommentRefNo = props.setFCommentRefNo;
  const rcmId = props.rcmId;
  const setRcmId = props.setRcmId;
  const load = props.load;
  const setLoad = props.setLoad;
  const memberId = props.memberId;
  const memberImage = props.memberImage;
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const memberGrade = props.memberGrade;

  return (
    <>
      <div className="feed-comment-wrap">
        {commentList.length !== 0 ? (
          <>
            {commentList.map((comment, index) => {
              return (
                <div key={"comment" + index}>
                  {comment.fcommentRefNo == 0 ? (
                    <div key={"comment" + index}>
                      <CommentList
                        comment={comment}
                        isLogin={isLogin}
                        setFCommentRefNo={setFCommentRefNo}
                        setRcmId={setRcmId}
                        load={load}
                        setLoad={setLoad}
                        memberId={memberId}
                        feedNo={feedNo}
                        loadList={loadList}
                        setLoadList={setLoadList}
                        memberGrade={memberGrade}
                      />
                      <div className="feed-comment-re-wrap">
                        {commentList.map((reComment, index) => {
                          return (
                            <div key={"recomment" + index}>
                              {comment.fcommentNo == reComment.fcommentRefNo ? (
                                <CommentList
                                  comment={reComment}
                                  isLogin={isLogin}
                                  setFCommentRefNo={setFCommentRefNo}
                                  setRcmId={setRcmId}
                                  load={load}
                                  setLoad={setLoad}
                                  memberId={memberId}
                                  type="reCmt"
                                  loadList={loadList}
                                  setLoadList={setLoadList}
                                  memberGrade={memberGrade}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="feed-comment-noco feed-comment-wrap">
            아직 등록된 댓글이 없습니다
          </div>
        )}
      </div>
      {isLogin && memberGrade !== 2 ? (
        <CommentFrm
          feedNo={feedNo}
          fCommentContent={fCommentContent}
          setFCommentContent={setFCommentContent}
          fCommentRefNo={fCommentRefNo}
          setFCommentRefNo={setFCommentRefNo}
          rcmId={rcmId}
          setRcmId={setRcmId}
          load={load}
          setLoad={setLoad}
          memberId={memberId}
          memberImage={memberImage}
          loadList={loadList}
          setLoadList={setLoadList}
        />
      ) : (
        ""
      )}
    </>
  );
};

const CommentList = (props) => {
  const comment = props.comment;
  const isLogin = props.isLogin;
  const memberId = props.memberId;
  const setFCommentRefNo = props.setFCommentRefNo;
  const setRcmId = props.setRcmId;
  const load = props.load;
  const setLoad = props.setLoad;
  const type = props.type;
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const memberGrade = props.memberGrade;

  //좋아요내역 불러오기
  const [userLike, setUserLike] = useState();
  const fcommentNo = comment.fcommentNo;
  const fc = { fcommentNo };
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post("/feed/commentLike", fc, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserLike(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  //좋아요클릭이벤트
  const likeEvent = () => {
    if (isLogin) {
      axios
        .post("/feed/updateCommentLike", fc, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            setUserLike(res.data);
            setLoad(load + 1);
          } else if (res.data == 2) {
            setUserLike(0);
            setLoad(load + 1);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
          Swal.fire({
            icon: "error",
            title: "문제가 발생했습니다",
            text: "관리자에게 문의하세요",
            confirmButtonText: "확인",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "로그인이 필요한 기능입니다",
        confirmButtonText: "확인",
      });
    }
  };
  //댓글삭제
  const deleteComment = () => {
    Swal.fire({
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/feed/comment/delete/" + comment.fcommentNo)
          .then((res) => {
            if (res.data !== 0) {
              setRcmId("");
              setFCommentRefNo(null);
              setLoad(load + 1);
              setLoadList(loadList + 1);
              Swal.fire({
                icon: "success",
                text: "댓글이 삭제되었습니다",
                confirmButtonText: "확인",
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
            Swal.fire({
              icon: "error",
              title: "문제가 발생했습니다",
              text: "관리자에게 문의하세요",
              confirmButtonText: "확인",
            });
          });
      }
    });
  };

  const reComemtEvent = () => {
    setFCommentRefNo(comment.fcommentNo);
    setRcmId(comment.fcommentWriter);
    setLoad(load + 1);
  };
  const navigate = useNavigate();
  const profile = () => {
    navigate("/memberProfile", { state: { memberId: comment.fcommentWriter } });
  };

  return (
    <>
      {/* {comment.fcommentRefNo === 0 ? ( */}
      <div className="feed-comment">
        <div className="feed-list-top">
          <div className="feed-list-profile">
            {comment.memberImage !== "" ? (
              <img src={"/member/" + comment.memberImage} onClick={profile} />
            ) : (
              <img src="/img/testImg_01.png" onClick={profile} />
            )}
          </div>
          <div className="feed-list-info">
            <div>
              {comment.fcommentWriter}
              <span>{comment.fcommentDate}</span>
            </div>
            <div className="feed-comment-detail">
              <span className="feed-comment-text">
                {comment.fcommentContent}
              </span>
              {userLike === 1 ? (
                <span className="material-icons-outlined" onClick={likeEvent}>
                  favorite
                </span>
              ) : (
                <span className="material-icons-outlined" onClick={likeEvent}>
                  favorite_border
                </span>
              )}
            </div>
            <div className="comment-click-btn">
              <div>
                좋아요 <span>{comment.totalCommentLike}</span>개
              </div>
              {isLogin && type !== "reCmt" && memberGrade != 2 ? (
                <div className="re" onClick={reComemtEvent}>
                  답글달기
                </div>
              ) : (
                ""
              )}
              {isLogin &&
              memberId == comment.fcommentWriter &&
              memberGrade !== memberGrade ? (
                <div onClick={deleteComment}>삭제</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
    </>
  );
};

const CommentFrm = (props) => {
  const memberId = props.memberId;
  const memberImage = props.memberImage;
  const fCommentContent = props.fCommentContent;
  const setFCommentContent = props.setFCommentContent;
  const fCommentRefNo = props.fCommentRefNo;
  const setFCommentRefNo = props.setFCommentRefNo;
  const feedNo = props.feedNo;
  const rcmId = props.rcmId;
  const setRcmId = props.setRcmId;
  const load = props.load;
  const setLoad = props.setLoad;
  const loadList = props.loadList;
  const setLoadList = props.setLoadList;
  const navigate = useNavigate();

  const changeContent = (e) => {
    const changeValue = e.currentTarget.value;
    // changeValue = changeValue.replace(/(?:\r\n|\r|\n)/g, "<br>");
    setFCommentContent(changeValue);
  };

  const rcmCancel = () => {
    setRcmId("");
    setFCommentRefNo(null);
  };

  const comment = () => {
    if (fCommentContent !== "") {
      const form = new FormData();
      form.append("feedNo", feedNo);
      form.append("fCommentContent", fCommentContent);
      if (fCommentRefNo !== null) {
        form.append("fCommentRefNo", fCommentRefNo);
      }
      const token = window.localStorage.getItem("token");
      axios
        .post("/feed/comment/insert", form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data == 1) {
            setFCommentContent("");
            rcmCancel();
            setLoad(load + 1);
            setLoadList(loadList + 1);
          }
        })
        .catch((res) => {
          console.log(res);
          Swal.fire({
            icon: "error",
            title: "문제가 발생했습니다",
            text: "관리자에게 문의하세요",
            confirmButtonText: "확인",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "댓글을 입력하세요",
        confirmButtonText: "확인",
      });
    }
  };
  const enterCheck = (e) => {
    if (e.keyCode === 13) {
      comment();
    }
  };

  return (
    <>
      {fCommentRefNo !== null ? (
        <div className="feed-comment-re">
          <span>{rcmId}</span>
          <span>님께 답글 남기는 중 ...</span>
          <span onClick={rcmCancel} class="material-icons">
            close
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="feed-comment-write">
        <div className="feed-comment-left">
          <div className="feed-list-profile">
            {memberImage !== "" ? (
              <img src={"/member/" + memberImage} />
            ) : (
              <img src="/img/testImg_01.png" />
            )}
          </div>
        </div>
        <div className="feed-comment-text">
          <input
            type="text"
            onChange={changeContent}
            onKeyUp={enterCheck}
            value={fCommentContent}
          />
          <button onClick={comment}>등록</button>
        </div>
      </div>
    </>
  );
};

export { FeedComment, CommentWrap };
