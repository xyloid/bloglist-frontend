import React, { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ErrorNotice from "./components/ErrorNotice";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import LoginFrom from "./components/LoginForm";
import Users from "./components/Users";
import { initBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNoticeContent } from "./reducers/noticeReducer";
import { setErrorNoticeContent } from "./reducers/errorNoticeReducer";
import { setCurrentUser, getAllUsers } from "./reducers/userReducer";

import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import {
  TableContainer,
  TableRow,
  Table,
  Paper,
  TableCell,
} from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch();
  const blog_redux = useSelector((state) => state.blogs);
  const users_info = useSelector((state) => state.user);

  // useEffect
  useEffect(() => {
    dispatch(initBlog());
    dispatch(getAllUsers());

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

  const padding = {
    padding: 5,
  };

  const matchUser = useRouteMatch("/users/:id");
  const user = matchUser
    ? users_info.users.find((u) => u.id === matchUser.params.id)
    : null;

  const matchBlog = useRouteMatch("/blogs/:id");
  const blog = matchBlog
    ? blog_redux.find((u) => u.id === matchBlog.params.id)
    : null;

  return (
    <div>
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
        <Route path="/users/:id">
          <UserDetails user={user} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails blog={blog} />
        </Route>
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
        {/* <Route path="/login">
            <LoginFrom handleLogin={handleLogin} />
          </Route> */}
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

                <TableContainer component={Paper}>
                  <Table>
                    {blog_redux.map((blog) => (
                      <TableRow id={blog.id}>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </TableCell>
                        <TableCell>{blog.author}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default App;
