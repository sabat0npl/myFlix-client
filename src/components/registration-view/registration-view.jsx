// Function component with React Hook
import React, { useState } from "react";
import axios from "axios";
import "./registration-view.scss";
// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      axios
        .post("https://brunoza-api.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
          props.RegistrationView(data);
        })
        .catch((e) => {
          console.log("error registering the user");
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
      <Form.Group controlId="RegUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="RegPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="RegEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="RegBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="submit" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
