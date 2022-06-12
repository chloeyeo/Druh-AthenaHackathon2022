import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import StepOne from "./pages/StepOne/StepOne";
import StepTwo from "./pages/StepTwo/StepTwo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/Step-1" element={<StepOne />}></Route>
          <Route path="/Step-2" element={<StepTwo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
