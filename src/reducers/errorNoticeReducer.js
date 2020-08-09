const errorNoticeReducer = (state = "", action) => {
  switch (action.type) {
    case "ERR_NOTICE_SET":
      return action.data;
    default:
      return state;
  }
};

export const setErrorNoticeContent = (message) => {
  return {
    type: "ERR_NOTICE_SET",
    data: message,
  };
};

export default errorNoticeReducer;
