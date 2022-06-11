import React from "react";
import Profile from "../../components/Profile/Profile";
import { Link } from "react-router-dom";

const StepOne = () => {
  return (
    <Profile activeStep={1}>
      <form className="step1Form">
        <div className="item">
          <label htmlFor="identity">I am a: </label>
          <select id="identity" name="identity">
            <option value="parent">Parent</option>
            <option value="guardian">Guardian</option>
            <option value="carer">Carer</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="firstName">First name: </label>
          <input type="text" id="firstName" />
        </div>
        <div className="item">
          <label htmlFor="lastName">Last name: </label>
          <input type="text" id="lastName" />
        </div>
        <label htmlFor="noOfChildren">No. of children: </label>
        <select id="noOfChildren" name="noOfChildren">
          {[...Array(11).keys()].map((i) => (
            <option value={i}>{i}</option>
          ))}
        </select>

        <Link className="button" to="/step-2">
          Next
        </Link>
      </form>
    </Profile>
  );
};

export default StepOne;
