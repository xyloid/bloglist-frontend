import { createStore, combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import noticeReducer from "./reducers/noticeReducer";
import errNoticeReducer from "./reducers/errorNoticeReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notice: noticeReducer,
  errNotice: errNoticeReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
