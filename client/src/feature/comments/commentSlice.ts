import { createSlice } from "@reduxjs/toolkit";

interface CommentState {
  value: number;
}

const initialState: CommentState = {
  value: 0,
};

export const CommentSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default CommentSlice.reducer;
