import React, { useState } from "react";
import "./SignUp.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import image from "../../assets/images/connect.svg";

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
      .post("http://localhost:5000/api/users/register", {
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
    <div className="signUpWrapper">
      <form className="signUp" onSubmit={submitUserData}>
        <h1>Sign up</h1>
        <div className="item">
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="janedoe91"
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
            placeholder="janedoe91@hotmail.com"
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

        {/* {isPostSuccess ? <h1>Success</h1> : <h1>Fail</h1>} */}
        <button type="submit" className="button">
          Sign up
        </button>

        <p className="loginText">
          already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>

      <div className="image">
        <img src={image} alt="friendship" />
      </div>
    </div>
  );
};

export default SignUp;
