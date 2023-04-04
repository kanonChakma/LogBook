import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axios";
import { removeUserInfoFromLocalStorage } from "../../common/userInfo";
import { removeCredential } from "../../feature/auth/authSlice";
import { useAppDispatch } from "../../feature/hook";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    axiosInstance.post("user/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    removeUserInfoFromLocalStorage();
    dispatch(removeCredential);
    navigate("/auth/login");
  });
  return <div>Logout</div>;
};

export default Logout;
