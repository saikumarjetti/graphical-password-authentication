// import { useState } from 'react'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  const handleLogin = (username, password) => {
    console.log(
      `Logged in with username: ${username} and password: ${password}`
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />;
      <Route path="/signup" element={<SignUp />} />;
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />;
    </Routes>
  );
}

export default App;
