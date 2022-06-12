import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import { Link } from "react-router-dom";
import "./StepOne.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StepOne = () => {
  const [identity, setIdentity] = useState("");
  const [fullname, setFullname] = useState("");
  const [location, setLocation] = useState("");
  const [noOfChildren, setNoOfChildren] = useState(0);

  const navigate = useNavigate();

  const submitUserData = (e) => {
    console.log("submitting");
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/update-user", {
        identity: identity,
        fullname: fullname,
        location: location,
        n_of_child: noOfChildren,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          navigate("/step-2", { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Profile activeStep={1}>
      <form className="step1Form" onSubmit={(e) => submitUserData(e)}>
        <div className="item">
          <label htmlFor="identity">I am a: </label>
          <select
            id="identity"
            name="identity"
            onChange={(e) => setIdentity(e.target.value)}
            value={identity}>
            <option value="parent">Parent</option>
            <option value="guardian">Guardian</option>
            <option value="carer">Carer</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="fullName">Full name: </label>
          <input
            type="text"
            id="fullName"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
          />
        </div>
        <div className="item">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            requi
          />
        </div>
        <div className="item">
          <label htmlFor="noOfChildren">No. of children: </label>
          <select
            id="noOfChildren"
            name="noOfChildren"
            onChange={(e) => setNoOfChildren(e.target.value)}
            value={noOfChildren}>
            {[...Array(11).keys()].map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>

        <button className="button">Next</button>
      </form>
    </Profile>
  );
};

export default StepOne;
