import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const AdminLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
