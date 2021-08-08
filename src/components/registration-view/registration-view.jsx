// Function component with React Hook
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./registration-view.scss";
// Bootstrap components
import { Form, Button } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      // Send a request to the server to register a new user
      axios
        .post("https://brunoza-api.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          window.open("/", "_self");
          alert("You have regiseterd!  Please login.");
        })
        .catch((e) => {
          alert("Error registering the user. Please try a different username");
          console.log(error);
        });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Minimum 5 characters.";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "Password is required.";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.emailNotEmail = "Email is not valid.";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  return (
    <Form>
      <Form.Group controlId="registerUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      {Object.keys(usernameError).map((key) => {
        return <div key={key}>{usernameError[key]}</div>;
      })}

      <Form.Group controlId="registerPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {Object.keys(passwordError).map((key) => {
        return <div key={key}>{passwordError[key]}</div>;
      })}

      <Form.Group controlId="registerEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      {Object.keys(emailError).map((key) => {
        return <div key={key}>{emailError[key]}</div>;
      })}

      <Form.Group controlId="registerBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Link to={"/"}>
        <Button
          style={{ margin: "3px" }}
          variant="info"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </Button>
      </Link>

      <Link to={"/"}>
        <Button variant="dark">Login</Button>
      </Link>
    </Form>
  );
}
