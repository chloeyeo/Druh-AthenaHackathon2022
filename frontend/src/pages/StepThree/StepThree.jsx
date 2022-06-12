import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./StepThree.scss";
import emailSvg from "../../assets/images/email.svg";

const StepThree = () => {
  return (
    <div className="stepThree">
      <Profile activeStep={3}>
        <div className="verifyWrapper">
          <img src={emailSvg} aria-hidden="true" />
          <h2>Please verify your email</h2>
          <p>
            You’re almost there! We sent an email to janedoe91@gmail.com. Click
            on the link in that email to complete your sign up.
          </p>
          <span>
            Still can't see it? <a>Resend email</a>
          </span>
          <Link className="button" to="/step-4">
            Next
          </Link>
        </div>
      </Profile>
    </div>
  );
};

export default StepThree;
