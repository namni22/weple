import "./afterMeet.css";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button1, Button2 } from "../util/Button";
import moment from "moment";
import ReactModal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";

const MeetCalendar = (props) => {
  const meetNo = props.meetNo;
  const [isOpen, setIsOpen] = useState(false);
  const [calStart, setCalStart] = useState("");
  const [calTitle, setCalTitle] = useState("");
  const [calContent, setCalContent] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [calLoad, setCalLoad] = useState(0);
  const [value, onChange] = useState(new Date());
  const activeDate = moment(value).format("YYYY-MM-DD");
  const [notification, setNotification] = useState([]);
  const [captainCk, setCaptainCk] = useState();
  //수정
  const [calNo, setCalNo] = useState(null);
  const [type, setType] = useState("");
  const token = window.localStorage.getItem("token");
  const myType = props.myType;
  const isLogin = props.isLogin;

  useEffect(() => {
    if (myType === "my") {
      const token = window.localStorage.getItem("token");
      if (isLogin) {
        axios
          .post("/meet/myCalendar", null, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            if (res.data !== null) {
              setSchedule(res.data);
              const arr = [];
              for (let i = 0; i < res.data.length; i++) {
                arr.push(res.data[i].calStart);
                setNotification([...arr]);
              }
            }
          })
          .catch((res) => {
            Swal.fire({
              icon: "error",
              title: "문제가 발생했습니다",
              text: "관리자에게 문의하세요",
              confirmButtonText: "확인",
            });
          });
      }
    } else {
      axios
        .get("/meet/calendarList/" + meetNo)
        .then((res) => {
          if (res.data !== null) {
            setSchedule(res.data);
            const arr = [];
            for (let i = 0; i < res.data.length; i++) {
              arr.push(res.data[i].calStart);
              setNotification([...arr]);
            }
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

      const m = { meetNo };
      axios
        .post("/meet/captainCk", m, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCaptainCk(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [calLoad]);

  const tileContent = ({ date, view }) => {
    let html = [];
    if (notification.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      html.push(<div className="notification"></div>);
    }
    return (
      <>
        <div className="calendar-notification">{html}</div>
      </>
    );
  };

  const addModal = () => {
    setType("add");
    setIsOpen(true);
  };
  const onCancel = () => {
    setIsOpen(false);
    setCalStart("");
    setCalTitle("");
    setCalContent("");
    setType("");
  };
  const scheduleModify = (e) => {
    setType("modify");
    setCalNo(e.currentTarget.value);
    const calNo = e.currentTarget.value;
    axios
      .get("/meet/schedule/" + calNo)
      .then((res) => {
        setCalStart(res.data.calStart);
        setCalTitle(res.data.calTitle);
        setCalContent(res.data.calContent);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    setIsOpen(true);
  };
  const scheduleDelete = (e) => {
    const calNo = e.currentTarget.value;
    Swal.fire({
      icon: "warning",
      text: "일정을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/meet/removeCalendar/" + calNo)
          .then((res) => {
            if (res.data > 0) {
              setCalNo(null);
              setCalLoad(calLoad + 1);
              Swal.fire({
                icon: "success",
                text: "일정이 삭제되었습니다",
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

  return (
    <div className="meetCalendar-wrap">
      <div className="meetCalendar">
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("D")}
          showNeighboringMonth={false}
          tileContent={tileContent}
        />
        {captainCk ? (
          <div className="meetCalendar-add-btn">
            <span className="material-icons-outlined" onClick={addModal}>
              add
            </span>
            <AddModal
              isOpen={isOpen}
              onCancel={onCancel}
              calStart={calStart}
              setCalStart={setCalStart}
              calTitle={calTitle}
              setCalTitle={setCalTitle}
              calContent={calContent}
              setCalContent={setCalContent}
              meetNo={meetNo}
              calLoad={calLoad}
              setCalLoad={setCalLoad}
              type={type}
              calNo={calNo}
              setCalNo={setCalNo}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="meetCalendar-schedule-wrap">
        <div className="meetCalendar-schedule-date"> {activeDate} </div>
        <div className="meetCalendar-schedule-content">
          {schedule.map((schedule, index) => {
            if (schedule.calStart == activeDate) {
              return (
                <div key={"schedule" + index}>
                  <div>
                    · {schedule.calTitle}
                    {captainCk ? (
                      <>
                        <button value={schedule.calNo} onClick={scheduleModify}>
                          수정
                        </button>
                        <button value={schedule.calNo} onClick={scheduleDelete}>
                          삭제
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>{schedule.calContent}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

//일정등록모달
const AddModal = (props) => {
  const calLoad = props.calLoad;
  const setCalLoad = props.setCalLoad;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      width: "450px",
      overflow: "inherit",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };
  const isOpen = props.isOpen;
  const onCancel = props.onCancel;
  const calStart = props.calStart;
  const setCalStart = props.setCalStart;
  const calTitle = props.calTitle;
  const setCalTitle = props.setCalTitle;
  const calContent = props.calContent;
  const setCalContent = props.setCalContent;
  const meetNo = props.meetNo;
  const type = props.type;
  const calNo = props.calNo;
  const setCalNo = props.setCalNo;

  //오늘날짜 0000-00-00 로 등록
  const now_utc = Date.now();
  const timeOff = new Date().getTimezoneOffset() * 60000;
  const today = new Date(now_utc - timeOff).toISOString().split("T")[0];

  const startDateChange = (e) => {
    const changeValue = e.currentTarget.value;
    setCalStart(changeValue);
  };
  const calTitleChange = (e) => {
    const changeValue = e.currentTarget.value;
    setCalTitle(changeValue);
  };
  const calContentChange = (e) => {
    const changeValue = e.currentTarget.value;
    setCalContent(changeValue);
  };

  const addSchedule = () => {
    if (
      calTitle !== "" &&
      calContent !== "" &&
      calStart !== "" &&
      meetNo !== ""
    ) {
      if (type == "add") {
        const cal = {
          calTitle: calTitle,
          calContent: calContent,
          calStart: calStart,
          meetNo: meetNo,
        };
        axios
          .post("/meet/addCalendar", cal)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                icon: "success",
                text: "등록을 완료했습니다",
                confirmButtonText: "확인",
              });
              setCalLoad(calLoad + 1);
              onCancel();
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
        const cal = {
          calTitle: calTitle,
          calContent: calContent,
          calStart: calStart,
          calNo: calNo,
        };
        axios
          .post("/meet/modifyCalendar", cal)
          .then((res) => {
            if (res.data > 0) {
              setCalNo(null);
              setCalLoad(calLoad + 1);
              onCancel();
              Swal.fire({
                icon: "success",
                text: "수정을 완료했습니다",
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
    } else {
      Swal.fire({
        icon: "error",
        text: "모든 값을 입력해주세요!",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div className="meetCalendar-modal">
        <span className="material-icons close" onClick={onCancel}>
          close
        </span>
        <div className="meetCalendar-modal-title">일정등록</div>
        <div className="meetCalendar-calTitle">
          <input
            value={calTitle}
            onChange={calTitleChange}
            placeholder="일정을 입력하세요"
            maxLength="66"
          ></input>
        </div>
        <div>
          <input
            type="date"
            name="date1"
            data-placeholder="날짜 선택"
            required
            aria-required="true"
            value={calStart}
            onChange={startDateChange}
            min={today}
          ></input>
        </div>
        <div>
          <textarea
            value={calContent}
            onChange={calContentChange}
            maxLength="1300"
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <Button1 text="등록하기" clickEvent={addSchedule} />
      </div>
    </ReactModal>
  );
};

export default MeetCalendar;
