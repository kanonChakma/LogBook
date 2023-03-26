import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

const AuthLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default AuthLayout;
