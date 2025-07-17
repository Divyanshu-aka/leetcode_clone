import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SingUpPage";

const App = () => {

  let authUser = null;

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />

      </Routes>
    </>
  );
};

export default App;
