import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import firebase from "../../config/firebase";
import "firebase/auth";

import Home from "../pages/Home";
import GerenciamentoAtletas from "../pages/GerenciamentoAtletas.js";
import BikeFit from "../pages/BikeFit.js";
import Resumos from "../pages/Resumos";
import Login from "../pages/LoginTemplate";

function ProtectedRoute({ element: Component, ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
}

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route
          path="/home"
          element={<ProtectedRoute element={Home} />}
        />
        <Route
          path="/geratletas"
          element={<ProtectedRoute element={GerenciamentoAtletas} />}
        />
        <Route
          path="/bikefit"
          element={<ProtectedRoute element={BikeFit} />}
        />
        <Route
          path="/resumos"
          element={<ProtectedRoute element={Resumos} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
