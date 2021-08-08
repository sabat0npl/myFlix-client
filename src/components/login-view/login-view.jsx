// Function component with React Hook
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./login-view.scss";
// Bootstrap components
import { Form, Button } from "react-bootstrap";

export function LoginView({onLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    axios
      .post(
        `https://brunoza-api.herokuapp.com/login?Username=${username}&Password=${password}`
      )
      .then((response) => {
        const data = response.data;
        console.log("data", data);
        onLoggedIn(data);
      })
      .catch((e) => {
        console.error(e);
        alert("Can not find that Username and Password");
      });
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 1) {
      usernameError.usernameShort = "Username is required";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  return (
    <Form id="form-styling">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      {Object.keys(usernameError).map((key) => {
        return <div key={key}>{usernameError[key]}</div>;
      })}

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {Object.keys(passwordError).map((key) => {
        return <div key={key}>{passwordError[key]}</div>;
      })}

      <Button
        style={{ margin: "3px" }}
        variant="info"
        type="submit"
        onClick={handleSubmit}
      >
        Log in
      </Button>

      <Link to={"/register"}>
        <Button style={{ margin: "3px" }} variant="dark">
          Register
        </Button>
      </Link>
    </Form>
  );
}

// PropTypes to validate data type input
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func,
};
