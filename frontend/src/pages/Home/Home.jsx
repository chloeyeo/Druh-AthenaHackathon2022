import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <form className="languageForm">
      <ul>
        <li>
          <input id="english" type="radio" name="language" />
          <label htmlFor="english">English</label>
        </li>
        <li>
          <input id="ukraine" type="radio" name="language" />
          <label htmlFor="ukraine">Ukrainian</label>
        </li>
        <li>
          <input id="russian" type="radio" name="language" />
          <label htmlFor="russian">Russian</label>
        </li>
      </ul>
      <Link className="primaryButton" to="/signup">
        Next
      </Link>
    </form>
  );
};

export default Home;
