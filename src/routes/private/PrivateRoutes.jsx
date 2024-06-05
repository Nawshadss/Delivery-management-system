import useAuth from "../../hooks/useAuth.jsx";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { userState, loading } = useAuth();
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (userState) {
    return children;
  }
  return <Navigate to="login"></Navigate>;
};

export default PrivateRoutes;
