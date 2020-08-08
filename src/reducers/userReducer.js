import userService from "../services/users";

const userReducer = (state = {user:null,users:[]}, action) => {
  switch (action.type) {
    case "USER_SET":
      return { ...state, user: action.data };
    case "USER_DEL":
      return null;
    case "ALL_USERS":
      console.log("all users", action.data);
      return { ...state, users: action.data };
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

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    return dispatch({
      type: "ALL_USERS",
      data: users,
    });
  };
};

export default userReducer;
