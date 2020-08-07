import React from "react";
import { useSelector } from "react-redux";

const ErrorNotice = () => {
  const message = useSelector((state) => state.errNotice);
  if (message === null || message.trim() === "") {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default ErrorNotice;
