import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const MainLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "50vh", marginTop: "20px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
