import React, { useState } from "react";
import "./ProfileListItem.scss";
import avatar from "../../assets/images/user.png";
import closeSvg from "../../assets/images/close.svg";
import msgIcon from "../../assets/images/speechbubble.svg";
import phoneIcon from "../../assets/images/phone.svg";

const ProfileListItem = (props) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className="profileListItem">
        <img src={avatar} alt="profile image" />
        <div className="details">
          <p>
            <b>{props.username}</b>
          </p>
          <span>{props.location}</span>
        </div>
        <button className="button" onClick={() => setShowModal(true)}>
          view profile
        </button>
      </div>

      {showModal && (
        <dialog open className="dialog">
          <button
            className="closeBtn"
            aria-label="close dialog"
            onClick={() => setShowModal(false)}>
            <img src={closeSvg} alt="close icon" />
          </button>
          <div className="content">
            <img src={avatar} alt="profile icon" />
            <p>
              <b>{props.username}</b>
            </p>
            <p>Location: {props.location}</p>
            <p>
              Child: {props.gender}, {props.age}yo
            </p>
            <div className="contactBtns">
              <a href={`mailto:${props.email}`}>
                <img src={msgIcon} alt="message icon" />
              </a>
              <button aria-label="start instant chat">
                <img src={phoneIcon} alt="phone icon" />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProfileListItem;
