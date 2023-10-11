import "./afterMeet.css"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button1 } from "../util/Button";

const MeetCalendar = () => {
    return (
        <div className="meetCalendar-all-wrap">
            <div className="meetCalendar">
                <Calendar />
            </div>
            <div className="meetCalendar-btn">
                <Button1 text={"일정등록하기"} />
            </div>
        </div>
    )
}

export default MeetCalendar;