import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import SignedHomePage from "./Components/SignedHomePage/SignedHomePage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";

function App() {
  return (
    // <div>
    //   <HomePage></HomePage>
    // </div>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<SignedHomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
