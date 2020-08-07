const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return state;
    case "USER_LOGOUT":
      return null;
    default:
      return state;
  }
};


export default userReducer;
