import React, { useState } from "react";
import "./SignUp.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const submitUserData = () => {
    console.log("submitting");
    console.log(username);

    // need to add api call to server here
    axios
      .post("/", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setIsPostSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsPostSuccess(false);
      });
  };

  console.log(isDirty);
  return (
    <form className="signUp" onSubmit={submitUserData}>
      <div className="item">
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="item">
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="item">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="item">
        <label htmlFor="confirmPassword">confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {isPostSuccess ? <h1>Success</h1> : <h1>Fail</h1>}
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUp;
