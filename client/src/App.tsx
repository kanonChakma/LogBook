import React from "react";
import { Navigate, useRoutes } from "react-router";
import Create from "./component/Admin/Create";
import Delete from "./component/Admin/Delete";
import Edit from "./component/Admin/Edit";
import Category from "./component/Category/Category";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Register from "./component/Register";
import Search from "./component/Search";
import SinglePost from "./component/SinglePost";
import AdminLayout from "./Layout/AdminLayout";
import AuthLayout from "./Layout/AuthLayout";
import MainLayout from "./Layout/MainLayout";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import PageNotFoundView from "./pages/PageNotFoundView";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "404", element: <PageNotFoundView /> },
      { path: "/post/:slug", element: <SinglePost /> },
      { path: "category/:category_name", element: <Category /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  };

  const accountRoutes = {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  };

  const adminRoutes = {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Admin /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "delete/:id", element: <Delete /> },
    ],
  };

  const routing = useRoutes([mainRoutes, accountRoutes, adminRoutes]);

  return <>{routing}</>;
};

export default App;
