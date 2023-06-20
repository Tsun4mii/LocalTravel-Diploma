import React from "react";
import AdminSidebar from "../../scenes/global/AdminSidebar";
import Topbar from "../../scenes/global/Topbar";

const Layout = ({ children }) => {
  return (
    <>
      <AdminSidebar />
      <main className="content">
        <Topbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
