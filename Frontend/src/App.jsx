import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import UserService from "./Services/UserService";

function App() {
  const navigate = useNavigate();

  const checkToken = () => {
    const isTokenExpired = UserService.isTokenValid();
    if (isTokenExpired) {
      UserService.logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
