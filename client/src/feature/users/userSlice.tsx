import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  value: number;
}

const initialState: UserState = {
  value: 0,
};

export const UserSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
