import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "../../utils/roles";

const AcceptorProtectedRoute = ({ children }) => {
  const isAcceptor = useSelector((state) => state.user.role);
  if (isAcceptor !== ROLES.acceptor) {
    return <Navigate to="/signin" replace />;
  }
  return children ? children : <Outlet />;
};

export default AcceptorProtectedRoute;
