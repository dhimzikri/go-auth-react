// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

function App() {
  const [userName, setUserName] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (response.ok) {
        setUserName(responseData.name);
      } else {
        setUserName("");
        console.error("User data not received");
      }
    } catch (error) {
      setUserName("");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    setTimeout(()=> {
      fetchUserData();
    },2000);
  }, []);
  return (
    <div>
      <Navbar userName={userName} onLogout={() => setUserName("")} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage userName={userName} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
