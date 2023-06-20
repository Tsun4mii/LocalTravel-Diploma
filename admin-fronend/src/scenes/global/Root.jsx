import React from "react";
import AdminSidebar from "./AdminSidebar";
import Topbar from "./Topbar";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  return (
    <>
      <AdminSidebar />
      <main className="content">
        <Topbar />
        <Outlet key={location.pathname} className="outlet" />
      </main>
    </>
  );
};

export default Root;
