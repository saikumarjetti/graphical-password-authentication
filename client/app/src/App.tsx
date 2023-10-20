// import { useState } from 'react'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  const handleLogin = (username: string, password: string) => {
    // Replace this with your actual login logic
    console.log(
      `Logged in with username: ${username} and password: ${password}`
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />;
      <Route path="/" element={<SignUp />} />;
      {/* <Route path="/" element={<Home />} />; */}
    </Routes>
  );
}

export default App;
