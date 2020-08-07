import React from "react";
import {useSelector} from "react-redux"

const Notification = () => {
  const message = useSelector(state=>state.notice)
  if (message === null || message.trim() === "") {
    return null;
  }
  return <div className="note">{message}</div>;
};

export default Notification;
