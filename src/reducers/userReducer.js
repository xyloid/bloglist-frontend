const userReducer = (state = null, action) => {
  switch (action.type) {
    case "USER_SET":
      return action.data;
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

export default userReducer;
