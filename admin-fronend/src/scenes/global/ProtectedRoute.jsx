import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
