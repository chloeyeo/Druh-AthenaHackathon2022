import React, { useState } from "react";
import "./SignUp.scss";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/connect.svg";
import LanguageDropdown from "../../components/LanguageDropdown/LanguageDropdown";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const submitUserData = (e) => {
    console.log("submitting");
    console.log(username);
    e.preventDefault();

    // need to add api call to server here
    axios
      .post("http://localhost:5000/api/users/register", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          const token  = response.data.token;
          localStorage.setItem('token', token);
          const userid  = response.data.userID;
          localStorage.setItem('userid', userid);
          navigate("/step-1", { replace: true });
        } else {
          setIsError(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="signUpWrapper">
      <LanguageDropdown />
      <form className="signUp" onSubmit={(e) => submitUserData(e)}>
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
            minLength="4"
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
            minLength="4"
            required
          />
        </div>

        <button className="button" type="submit">
          Sign up
        </button>

        {isError && (
          <p className="error">There has been an error, please try again</p>
        )}

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
