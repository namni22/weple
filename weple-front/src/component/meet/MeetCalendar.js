import "./afterMeet.css"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const MeetCalendar =  ()=>{
    return (
        <div>
            <div>캘린더</div>
            <div>
                <Calendar/>
            </div>
        </div>
    )
}

export default MeetCalendar;