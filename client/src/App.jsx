// cleaned

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import MainApp from "./components/MainApp";

export default function App() {

  const [openSnack, setOpenSnack] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <Login openSnack={openSnack} setOpenSnack={setOpenSnack} /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!token ? <Signup setOpenSnack={setOpenSnack} /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={token ? <MainApp /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}