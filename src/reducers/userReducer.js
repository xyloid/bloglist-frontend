const userReducer = (state = null, action) => {
  switch (action.type) {
    case "USER_SET":
      return action.data;
    case "USER_DEL":
      return null;
    case "ALL_USERS":
      return state;
    default:
      return state;
  }
};

export const setCurrentUser = (user) => {
  return {
    type: "USER_SET",
    data: user,
  };
};

export const delCurrentUser = () => {
  return {
    type: "USER_DEL",
  };
};

export default userReducer;
