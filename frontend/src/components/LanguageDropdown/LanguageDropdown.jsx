import React, { useState } from "react";
import "./LanguageDropdown.scss";
import ukFlag from "../../assets/images/flaguk.png";
import ukraineFlag from "../../assets/images/flagukraine.png";
import russianFlag from "../../assets/images/flagrussia.png";

const LanguageDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="languageDropdown">
      <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <img src={ukFlag} aria-hidden="true" />
        ENG
      </button>
      {isDropdownOpen && (
        <ul>
          <li>
            <button>
              <img src={ukraineFlag} aria-hidden="true" />
              UKR
            </button>
          </li>

          <li>
            <button>
              <img src={russianFlag} aria-hidden="true" />
              RUS
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
