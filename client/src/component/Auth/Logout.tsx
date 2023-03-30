import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axios";
import { removeUserInfoFromLocalStorage } from "../../common/userInfo";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.post("user/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    removeUserInfoFromLocalStorage();
    navigate("/auth/login");
  });
  return <div>Logout</div>;
};

export default Logout;
