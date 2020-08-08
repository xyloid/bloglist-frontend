import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername("");
    setPassword("");
    // history.push("/");
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={login}>
        <div>
          username
          <input
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            name="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;
