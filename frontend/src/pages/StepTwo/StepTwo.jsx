import React, { useState } from "react";
import Profile from "../../components/Profile/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StepTwo.scss";

const StepTwo = () => {
  const [childFullname, setchildFullname] = useState("");
  const [childAge, setchildAge] = useState(0);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const submitUserData = (e) => {
    e.preventDefault();

    // need to add api call to server here
    // TODO: replace api endpoint
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userid')
    let axiosConfig = {
      headers: {
        "authorization" : token
      }
    };

    axios
      .post("http://localhost:5000/api/add-child", {
        childFullname: childFullname,
        childAge: childAge,
        gender: gender,
        userid: userId,
      },
      axiosConfig)
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

  return (
    <Profile activeStep={2}>
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
          <label htmlFor="gender">Gender: </label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            required
          />
        </div>

        {/* functionality for add child needs to be implemented */}
        <button className="addChild">Add child +</button>
        <button className="button">Next</button>
      </form>
    </Profile>
  );
};

export default StepTwo;
