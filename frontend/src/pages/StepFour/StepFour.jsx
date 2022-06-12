import React from "react";
import Profile from "../../components/Profile/Profile";
import { Link } from "react-router-dom";
import "./StepFour.scss";
import emailSvg from "../../assets/images/email.svg";

const StepFour = () => {
  return (
    <div className="stepFour">
      <Profile activeStep={4}>
        <div className="confirmWrapper">
          <img src={emailSvg} aria-hidden="true" />
          <h2>You're all set!</h2>
          <p>Click confirm below to start browsing!</p>

          <Link className="button" to="/findfriends">
            Confirm
          </Link>
        </div>
      </Profile>
    </div>
  );
};

export default StepFour;
