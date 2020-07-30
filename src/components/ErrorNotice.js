import React from "react";

const ErrorNotice = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default ErrorNotice;
