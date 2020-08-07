import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ErrorNotice from "./components/ErrorNotice";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import LoginFrom from "./components/LoginForm";
import { initBlog } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import {setNoticeContent}from './reducers/noticeReducer'

const App = () => {
  const dispatch = useDispatch();
  const blog_redux = useSelector((state) => state.blogs);

  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [errorNotice, setErrorNotice] = useState(null);

  const updateBlogs = () => {
    dispatch(initBlog());
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };

  // useEffect
  useEffect(updateBlogs, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // event handlers

  const handleLogin = async (usernm, passwd) => {
    try {
      const currentUser = await loginService.login({
        username: usernm,
        password: passwd,
      });

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(currentUser)
      );
      blogService.setToken(currentUser.token);

      // setNotice(`${currentUser.name} logged in`);
      dispatch(setNoticeContent(`${currentUser.name} logged in`))
      setTimeout(() => {
        dispatch(setNoticeContent(null))
      }, 5000);

      setUser(currentUser);
    } catch (exception) {
      console.log("login error", exception);
      setErrorNotice("failed to log in");
      setTimeout(() => {
        setErrorNotice(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");

    dispatch(setNoticeContent(`You have logged out`))
      setTimeout(() => {
        dispatch(setNoticeContent(null))
      }, 5000);
  };

  const createNewBlog = (newBlog) => {
    dispatch(setNoticeContent(`${newBlog.title} by ${newBlog.author} added`))
      setTimeout(() => {
        dispatch(setNoticeContent(null))
      }, 5000);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  // internal components

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginFrom handleLogin={handleLogin} />
    </Togglable>
  );

  const userInfo = () => (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <NewBlog update={createNewBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateAll={updateBlogs} />
      ))}
      <h2>blogs redux</h2>
      {blog_redux.map((blog) => (
        <Blog key={blog.id} blog={blog} updateAll={updateBlogs} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification />
      <ErrorNotice message={errorNotice} />

      {user === null ? loginForm() : userInfo()}
    </div>
  );
};

export default App;
