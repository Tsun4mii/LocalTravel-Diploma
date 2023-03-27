import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "../../utils/roles";

const CreatorProtectedRoute = ({ children }) => {
  const isCreator = useSelector((state) => state.user.role);
  if (isCreator !== ROLES.creator) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default CreatorProtectedRoute;
