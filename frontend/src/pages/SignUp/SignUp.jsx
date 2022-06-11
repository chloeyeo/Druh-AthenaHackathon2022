import React from "react";
import "./SignUp.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  const submitUserData = () => {
    console.log("submitting");

    // need to add api call to server here
  };

  return (
    <form onSubmit={submitUserData()} className="signUp">
      <div className="item">
        <label for="username">username</label>
        <input id="username" type="text" />
      </div>
      <div className="item">
        <label for="email">email</label>
        <input id="email" type="email" />
      </div>
      <div className="item">
        <label for="password">password</label>
        <input id="password" type="password" />
      </div>
      <div className="item">
        <label for="confirmPassword">confirm password</label>
        <input id="confirmPassword" type="password" />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUp;
