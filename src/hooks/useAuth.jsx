import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";

const useAuth = () => {
  const useAuth = useContext(AuthProvider);
  return useAuth;
};

export default useAuth;
