import React, { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ErrorNotice from "./components/ErrorNotice";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import LoginFrom from "./components/LoginForm";
import Users from "./components/User";
import { initBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNoticeContent } from "./reducers/noticeReducer";
import { setErrorNoticeContent } from "./reducers/errorNoticeReducer";
import { setCurrentUser } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const blog_redux = useSelector((state) => state.blogs);
  const users_info = useSelector((state) => state.user);

  // useEffect
  useEffect(() => {
    dispatch(initBlog());

    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  // event handlers

  const handleLogin = async (usernm, passwd) => {
    try {
      const currentUser = await loginService.login({
        username: usernm,
        password: passwd,
      });

      dispatch(setCurrentUser(currentUser));

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(currentUser)
      );
      blogService.setToken(currentUser.token);

      // setNotice(`${currentUser.name} logged in`);
      dispatch(setNoticeContent(`${currentUser.name} logged in`));
      setTimeout(() => {
        dispatch(setNoticeContent(null));
      }, 5000);
    } catch (exception) {
      console.log("login error", exception);
      dispatch(setErrorNoticeContent("failed to log in"));
      setTimeout(() => {
        dispatch(setErrorNoticeContent(null));
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");

    dispatch(setCurrentUser(null));

    dispatch(setNoticeContent(`You have logged out`));
    setTimeout(() => {
      dispatch(setNoticeContent(null));
    }, 5000);
  };

  // const createNewBlog = (newBlog) => {
  //   dispatch(setNoticeContent(`${newBlog.title} by ${newBlog.author} added`));
  //   setTimeout(() => {
  //     dispatch(setNoticeContent(null));
  //   }, 5000);
  //   blogService
  //     .getAll()
  //     .then((blogs) =>dispatch(initBlog(blogs.sort((a, b) => b.likes - a.likes))))
  // };

  // internal components

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginFrom handleLogin={handleLogin} />
    </Togglable>
  );

  const userInfo = () => (
    <div>
      <p>
        {users_info.user.name} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <NewBlog />
      </Togglable>
      <Users />
      <h2>blogs</h2>
      {blog_redux.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>

          {users_info.user ? <em>{users_info.user.name} logged in</em> : null}
          {users_info.user ? (
            <button onClick={handleLogout}>logout</button>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </div>

        <Notification />
        <ErrorNotice />

        <Switch>
          <Route
            path="/login"
            render={() =>
              users_info.user ? (
                <Redirect to="/" />
              ) : (
                <LoginFrom handleLogin={handleLogin} />
              )
            }
          />

          <Route path="/users">
            <Users />
          </Route>
          <Route
            path="/"
            render={() =>
              users_info.user ? (
                <div>
                  <Togglable buttonLabel="new blog">
                    <NewBlog />
                  </Togglable>
                  {blog_redux.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
