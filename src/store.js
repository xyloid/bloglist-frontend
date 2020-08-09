import { createStore, combineReducers, applyMiddleware } from "redux";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import noticeReducer from "./reducers/noticeReducer";
import errNoticeReducer from "./reducers/errorNoticeReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducers = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notice: noticeReducer,
  errNotice: errNoticeReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
