import React from "react";

const ErrorNotice = ({ message }) => {
  if (message === null || message.trim() === "") {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default ErrorNotice;
