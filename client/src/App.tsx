import React from "react";
import { Navigate, useRoutes } from "react-router";
import Login from "./component/Login";
import Register from "./component/Register";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import PageNotFoundView from "./pages/PageNotFoundView";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Home /> },
      { path: "404", element: <PageNotFoundView /> },
      { path: "account", element: <Navigate to="/account/list" /> },
    ],
  };

  const accountRoutes = {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  };

  const routing = useRoutes([mainRoutes, accountRoutes]);

  return <>{routing}</>;
};

export default App;
