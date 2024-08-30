import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import UserSession from "../UserSession";

const ProtectedRoute = ({ children }) => {
  const { authTokens, isTokenExpired } = useAuth();

  if (!authTokens || !authTokens.token) {
    return <Navigate to="/login" />;
  }

  if (isTokenExpired) {
    return <UserSession />;
  }

  return children;
};

export default ProtectedRoute;
