const noticeReducer = (state, action) => {
  switch (action.type) {
    case "NOTICE_SET":
      return action.data;
    default:
      return state;
  }
};

export const setNotice = (message) => {
  return {
    type: "NOTICE_SET",
    data: message,
  };
};

export default noticeReducer;
