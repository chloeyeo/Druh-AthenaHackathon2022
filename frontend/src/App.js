import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LanguageForm from "./pages/LanguageForm/LanguageForm";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LanguageForm />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
