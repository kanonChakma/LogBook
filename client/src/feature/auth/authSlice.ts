import { createSlice } from "@reduxjs/toolkit";
import { ApiError, authType } from "../../common/types";
import { RootState } from "../../store";
import { loginUser, registerUser } from "./authActions";

const profile_info = {
  about: "",
  email: "",
  id: 0,
  profile_image: "",
  start_date: "",
  user_name: "",
  gender: "",
  birth_date: "",
  first_name: "",
  last_name: "",
  contact_number: "",
};

const initialState: authType = {
  loading: false,
  userInfo: profile_info, // for user object
  userCredentials: {
    access: "",
    refresh: "",
    userId: "",
    username: "",
    email: "",
  },

  error: {
    message: "",
    code: 0,
  },
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeCredential(state, action) {
      state.error = {
        message: "",
        code: 0,
      };
      state.userCredentials = {
        access: "",
        refresh: "",
        userId: "",
        username: "",
        email: "",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ApiError;
    });

    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userCredentials = action.payload;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ApiError;
    });
  },
});

export const selectUser = (state: RootState) => state.auth.userInfo;
export const getAuthStatus = (state: RootState) => state.auth.success;
export const getAuthError = (state: RootState) => state.auth.error;

export const { removeCredential } = authSlice.actions;
export default authSlice.reducer;
