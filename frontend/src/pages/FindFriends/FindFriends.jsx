import React, { useEffect, useState } from "react";
import LanguageDropdown from "../../components/LanguageDropdown/LanguageDropdown";
import "./FindFriends.scss";
import mapImage from "../../assets/images/map.png";
import ProfileListItem from "../../components/ProfileListItem/ProfileListItem";
import axios from "axios";

const FindFriends = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/")
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          setProfileData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, profileData);

  const profiles = [
    {
      username: "_oksanamoroz",
      location: "Cardiff",
      email: "abc@test.com",
      child: { gender: "female", age: 8, speakEnglish: false },
    },
    {
      username: "_oksanamoroz",
      location: "Cardiff",
      email: "abc@test.com",
      child: { gender: "female", age: 8, speakEnglish: false },
    },
  ];
  return (
    <div className="findFriends">
      <LanguageDropdown />

      <div className="flex">
        <div className="mapWrapper">
          <img src={mapImage} alt="map of UK" />
        </div>
        <div className="listWrapper">
          <h1>Find friends</h1>
          <p>Click on a profile to start messaging</p>

          {/* fetch profile items and map */}
          {profiles.map((profile) => (
            <ProfileListItem
              username={profile.username}
              location={profile.location}
              email={profile.email}
              child={profile.child}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
