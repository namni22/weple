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
  const [calEnd, setCalEnd] = useState("");
  const [calTitle, setCalTitle] = useState("");
  const [calContent, setCalContent] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [calLoad, setCalLoad] = useState(0);
  const [value, onChange] = useState(new Date());
  const activeDate = moment(value).format("YYYY-MM-DD");
  const [notification, setNotification] = useState([]);
  //수정
  const [calNo, setCalNo] = useState(null);
  const [type, setType] = useState("");
  useEffect(() => {
    axios
      .get("/meet/calendarList/" + meetNo)
      .then((res) => {
        setSchedule(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const arr = notification;
          arr.push(res.data[i].calStart);
          setNotification(arr);
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
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
    setCalEnd("");
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
        setCalEnd(res.data.calEnd);
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
            if (res.data !== 0) {
              Swal.fire({
                icon: "success",
                text: "일정이 삭제되었습니다",
                confirmButtonText: "확인",
              }).then(() => {
                setCalNo(null);
                setCalLoad(calLoad + 1);
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
        setCalLoad(calLoad + 1);
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
        <div className="meetCalendar-add-btn">
          <span className="material-icons-outlined" onClick={addModal}>
            add
          </span>
        </div>
        <AddModal
          isOpen={isOpen}
          onCancel={onCancel}
          calStart={calStart}
          setCalStart={setCalStart}
          calEnd={calEnd}
          setCalEnd={setCalEnd}
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
      <div className="meetCalendar-schedule-wrap">
        <div className="meetCalendar-schedule-date"> {activeDate} </div>
        <div className="meetCalendar-schedule-content">
          {schedule.map((schedule, index) => {
            if (schedule.calStart == activeDate) {
              return (
                <div key={"schedule" + index}>
                  <div>
                    · {schedule.calTitle}
                    <button value={schedule.calNo} onClick={scheduleModify}>
                      수정
                    </button>
                    <button value={schedule.calNo} onClick={scheduleDelete}>
                      삭제
                    </button>
                  </div>
                  <div>{schedule.calContent}</div>
                </div>
              );
            } else {
              <div key={"schedule" + index}>
                <div className="no-schedule">등록된 일정이 없습니다</div>
              </div>;
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
  const calEnd = props.calEnd;
  const setCalEnd = props.setCalEnd;
  const calTitle = props.calTitle;
  const setCalTitle = props.setCalTitle;
  const calContent = props.calContent;
  const setCalContent = props.setCalContent;
  const meetNo = props.meetNo;
  const type = props.type;
  const calNo = props.calNo;
  const setCalNo = props.setCalNo;
  const schedule = props.schedule;
  const setSchedule = props.setSchedule;
  if (type == "modify") {
  }

  //오늘날짜 0000-00-00 로 등록
  const now_utc = Date.now();
  const timeOff = new Date().getTimezoneOffset() * 60000;
  const today = new Date(now_utc - timeOff).toISOString().split("T")[0];

  const startDateChange = (e) => {
    const changeValue = e.currentTarget.value;
    setCalStart(changeValue);
  };
  const endDateChange = (e) => {
    const changeValue = e.currentTarget.value;
    setCalEnd(changeValue);
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
      calEnd !== "" &&
      meetNo !== ""
    ) {
      if (type == "add") {
        const cal = {
          calTitle: calTitle,
          calContent: calContent,
          calStart: calStart,
          calEnd: calEnd,
          meetNo: meetNo,
        };
        axios
          .post("/meet/addCalendar", cal)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                text: "일정등록완료",
                confirmButtonText: "확인",
              });
              setCalLoad(calLoad + 1);
              onCancel();
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      } else {
        const cal = {
          calTitle: calTitle,
          calContent: calContent,
          calStart: calStart,
          calEnd: calEnd,
          calNo: calNo,
        };
        console.log(cal);
        axios
          .post("/meet/modifyCalendar", cal)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                text: "일정수정완료",
                confirmButtonText: "확인",
              });
              setCalNo(null);
              setCalLoad(calLoad + 1);
              onCancel();
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    } else {
      Swal.fire({
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
          ></input>
        </div>
        <div className="meetCalendar-modal-date">
          <div>
            <label htmlFor="date1">시작일</label>
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
            <label htmlFor="date1">종료일</label>
            <input
              type="date"
              name="date2"
              data-placeholder="날짜 선택"
              required
              aria-required="true"
              value={calEnd}
              onChange={endDateChange}
              min={calStart}
            ></input>
          </div>
        </div>
        <div>
          <textarea
            value={calContent}
            onChange={calContentChange}
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <Button1 text="등록하기" clickEvent={addSchedule} />
      </div>
    </ReactModal>
  );
};

export default MeetCalendar;
