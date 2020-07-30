import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ErrorNotice from "./components/ErrorNotice";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import LoginFrom from "./components/LoginForm";


const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [notice, setNotice] = useState(null);
  const [errorNotice, setErrorNotice] = useState(null);

  // useEffect
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // event handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const currentUser = await loginService.login({ username, password });

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(currentUser)
      );
      blogService.setToken(currentUser.token);

      setNotice(`${currentUser.name} logged in`)
      setTimeout(()=>{
        setNotice(null)
      },5000)

      setUser(currentUser);
      setUsername("");
      setPassword("");
    } catch (exception){
      console.log("login error",exception);
      setErrorNotice(`failed to log in`)
      setTimeout(()=>{
        setErrorNotice(null)
      },5000)
    }
  };

  const handleLogin2 =async (usernm, passwd)=>{
    try {
      const currentUser = await loginService.login({ username:usernm, password:passwd });

      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(currentUser)
      );
      blogService.setToken(currentUser.token);

      setNotice(`${currentUser.name} logged in`)
      setTimeout(()=>{
        setNotice(null)
      },5000)

      setUser(currentUser);
    } catch (exception){
      console.log("login error",exception);
      setErrorNotice(`failed to log in`)
      setTimeout(()=>{
        setErrorNotice(null)
      },5000)
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  // internal components

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginFrom handleLogin = {handleLogin2}/>
    </Togglable>
    // <div>
    //   <h2>Log in to application</h2>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       username
    //       <input
    //         type="text"
    //         value={username}
    //         name="Username"
    //         onChange={({ target }) => {
    //           setUsername(target.value);
    //         }}
    //       />
    //     </div>
    //     <div>
    //       password
    //       <input
    //         type="password"
    //         value={password}
    //         name="Password"
    //         onChange={({ target }) => {
    //           setPassword(target.value);
    //         }}
    //       />
    //     </div>
    //     <button type="submit">login</button>
    //   </form>
    // </div>
  );

  const userInfo = () => (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <NewBlog
        update={(newBlog) => {
          setNotice(`${newBlog.title} by ${newBlog.author} added`)
      setTimeout(()=>{
        setNotice(null)
      },5000)
          blogService.getAll().then((blogs) => setBlogs(blogs));
        }}
      />
    </div>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <Notification message={notice}/>
      <ErrorNotice message={errorNotice}/>

      {user === null ? loginForm() : userInfo()}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
