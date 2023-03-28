import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../common/axios";
import { SinglePostType } from "../../common/types";
import { RootState } from "../../store";
interface ApiError {
  message: string;
  code: number;
}
interface PostState {
  posts: SinglePostType[];
  status: string;
  error: ApiError;
  isLoading: boolean;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  isLoading: false,
  error: {
    message: "",
    code: 0,
  },
};

const POSTS_URL = "posts/";

export const featchPosts = createAsyncThunk<
  SinglePostType[],
  { rejectValue: ApiError }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(POSTS_URL);
    return [...response.data];
  } catch (err: any) {
    return rejectWithValue({
      message: err.message as string,
      code: err.code,
    });
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await axios.post(POSTS_URL, postData);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // const existingPost = state.posts.find(((post) => post.id === postId))
      // if(existingPost) {
      //     existingPost.reactions[reaction]++
      // }
    },
  },
  extraReducers(builder) {
    builder.addCase(featchPosts.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(featchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    });

    builder.addCase(featchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as ApiError;
    });

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      state.posts.push(action.payload);
    });
  },
});

export const selectAllPost = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { reactionAdded } = postSlice.actions;
export default postSlice.reducer;
