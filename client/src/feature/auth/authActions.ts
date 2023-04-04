import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../common/axios";
import {
  ApiError,
  LoginRequest,
  LoginResponse,
  ProfileType,
} from "../../common/types";
import {
  getUserInfoFromLocalStorage,
  setUserInfoInLocalStorage,
} from "../../common/userInfo";

export const backendURL = "http://127.0.0.1:8000";

export interface MyParams {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  ProfileType,
  FormData,
  { rejectValue: ApiError }
>("auth/register", async (formData: FormData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${backendURL}/api/user/register/`,
      formData,
      config
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue({
      message: err.message as string,
      code: err.code,
    });
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: ApiError }
>("auth/login", async (userInfo: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("token/", userInfo);
    setUserInfoInLocalStorage(response.data);
    return getUserInfoFromLocalStorage() as LoginResponse;
  } catch (err: any) {
    console.log(err);
    return rejectWithValue({
      message: err.response.data.detail as string,
      code: err.response.status,
    });
  }
});
