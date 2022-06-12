import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import StepOne from "./pages/StepOne/StepOne";
import StepTwo from "./pages/StepTwo/StepTwo";
import StepThree from "./pages/StepThree/StepThree";
import StepFour from "./pages/StepFour/StepFour";
import FindFriends from "./pages/FindFriends/FindFriends";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/step-1" element={<StepOne />}></Route>
          <Route path="/step-2" element={<StepTwo />}></Route>
          <Route path="/step-3" element={<StepThree />}></Route>
          <Route path="/step-4" element={<StepFour />}></Route>
          <Route path="/findfriends" element={<FindFriends />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
