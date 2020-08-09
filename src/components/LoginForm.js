import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

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
          <TextField
            value={username}
            name="Username"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            value={password}
            name="Password"
            type="password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button
            style={{marginTop: 10}}
            variant="contained"
            color="primary"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;
