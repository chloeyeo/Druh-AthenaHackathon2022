import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ukflag from "../../assets/images/flaguk.png";
import ukraine from "../../assets/images/flagukraine.png";
import russia from "../../assets/images/flagrussia.png";

const Home = () => {
  return (
    <div className="home">
      <div className="leftside">
        <img src={logo} alt="Druh logo" />
      </div>
      <div className="rightside">
        <p>
          Connect your child with other Ukrainian children from across the
          United Kingdom.
        </p>
        <form className="languageForm">
          <ul>
            <li>
              <input id="english" type="radio" name="language" />
              <img src={ukflag} alt="uk flag" />
              <label htmlFor="english">English</label>
            </li>
            <li>
              <input id="ukraine" type="radio" name="language" />
              <img src={ukraine} alt="ukraine flag" />
              <label htmlFor="ukraine">Ukrainian</label>
            </li>
            <li>
              <input id="russian" type="radio" name="language" />
              <img src={russia} alt="russia flag" />
              <label htmlFor="russian">Russian</label>
            </li>
          </ul>
          <Link className="primaryButton" to="/signup">
            Next
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Home;
