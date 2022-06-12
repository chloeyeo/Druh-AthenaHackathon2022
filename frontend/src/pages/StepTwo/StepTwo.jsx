import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StepTwo.scss";

const StepTwo = () => {
  const [childFullname, setchildFullname] = useState("");
  const [childAge, setchildAge] = useState(0);
  const [gender, setGender] = useState("");
  const [speakEnglish, setSpeakEnglish] = useState(true);

  const navigate = useNavigate();

  const submitUserData = (e) => {
    console.log("submitting");
    e.preventDefault();

    // need to add api call to server here
    // TODO: replace api endpoint
    axios
      .post("http://localhost:5000/", {
        childFullname: childFullname,
        childAge: childAge,
        gender: gender,
        speakEnglish: speakEnglish,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          navigate("/step-3", { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ChildForm = () => {
    return (
      <form className="step1Form childForm" onSubmit={(e) => submitUserData(e)}>
        <div className="item">
          <label htmlFor="childFullname">Full name: </label>
          <input
            id="childFullname"
            name="childFullname"
            onChange={(e) => setchildFullname(e.target.value)}
            value={childFullname}
            type="text"
            required
          />
        </div>
        <div className="item">
          <label htmlFor="childAge">Age: </label>
          <input
            type="number"
            min={5}
            max={99}
            id="childAge"
            onChange={(e) => setchildAge(e.target.value)}
            value={childAge}
            required
          />
        </div>
        <div className="item">
          <label htmlFor="gender">Location: </label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            required
          />
        </div>
        <div className="item">
          <label htmlFor="speakEnglish">Can they speak english?: </label>
          <ul id="speakEnglish">
            <li>
              <label htmlFor="yesEnglish">Yes</label>
              <input
                type="radio"
                className="radio"
                id="yesEnglish"
                value={speakEnglish}
                onChange={() => setSpeakEnglish(true)}
                checked={speakEnglish}
                required
              />
            </li>
            <li>
              <label htmlFor="noEnglish">No</label>
              <input
                className="radio"
                type="radio"
                id="noEnglish"
                value={!speakEnglish}
                onChange={() => setSpeakEnglish(false)}
                checked={!speakEnglish}
                required
              />
            </li>
          </ul>
        </div>
        {/* functionality for add child needs to be implemented */}
        <button className="addChild">Add child +</button>
        <button className="button">Next</button>
      </form>
    );
  };

  return (
    <Profile activeStep={2}>
      <ChildForm />
    </Profile>
  );
};

export default StepTwo;
