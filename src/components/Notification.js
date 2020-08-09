import React from "react";
import {useSelector} from "react-redux"
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const message = useSelector(state=>state.notice)
  if (message === null || message.trim() === "") {
    return null;
  }
  return <Alert severity="success">{message}</Alert>;
};

export default Notification;
