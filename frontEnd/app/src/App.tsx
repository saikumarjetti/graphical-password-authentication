// import { useState } from 'react'
import Login from "./pages/Login";
import "./App.css";

function App() {
  const handleLogin = (username: string, password: string) => {
    // Replace this with your actual login logic
    console.log(
      `Logged in with username: ${username} and password: ${password}`
    );
  };

  return <Login onLogin={handleLogin} />;
}

export default App;
