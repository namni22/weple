import { useEffect, useState } from "react";
import "../meet/afterMeet.css";
import MeetCalendar from "../meet/MeetCalendar";
import axios from "axios";

const MyCalendar = (props) => {
  const isLogin = props.isLogin;

  return <MeetCalendar myType="my" isLogin={isLogin} />;
};

export default MyCalendar;
