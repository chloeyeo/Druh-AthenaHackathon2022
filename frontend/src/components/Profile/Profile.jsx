import React from "react";
import "./Profile.scss";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import Card from "../Card/Card";
import StepsWrapper from "../StepsWrapper/StepsWrapper";

const Profile = (props) => {
  return (
    <div className="profile">
      <LanguageDropdown />

      <Card>
        <h1>Create your profile</h1>
        <StepsWrapper activeStep={props.activeStep} />
        {props.children}
      </Card>
    </div>
  );
};

export default Profile;
