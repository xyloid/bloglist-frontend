import React from "react";
import { useSelector } from "react-redux";
import { Alert } from '@material-ui/lab'

const ErrorNotice = () => {
  const message = useSelector((state) => state.errNotice);
  if (message === null || message.trim() === "") {
    return null;
  }
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorNotice;
