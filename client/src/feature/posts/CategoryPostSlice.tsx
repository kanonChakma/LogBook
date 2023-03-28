import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../common/axios";
import { SinglePostType } from "../../common/types";
import { RootState } from "../../store";

interface ApiError {
  message: string;
  code: number;
}
interface categoryPoststate {
  categoryPosts: SinglePostType[];
  status: string;
  error: ApiError;
  isLoading: boolean;
}

const initialState: categoryPoststate = {
  categoryPosts: [],
  status: "idle",
  isLoading: false,
  error: {
    message: "",
    code: 0,
  },
};

const categoryPosts_URL = "categories/";

export const featchPostsByCategory = createAsyncThunk<
  SinglePostType[],
  string,
  { rejectValue: ApiError }
>(
  "posts/fetchcategoryPostsByCategory",
  async (category_name: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(categoryPosts_URL, {
        category_name,
      });
      return [...response.data];
    } catch (err: any) {
      return rejectWithValue({
        message: err.message as string,
        code: err.code,
      });
    }
  }
);

export const categoryPostslice = createSlice({
  name: "categoryPosts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(featchPostsByCategory.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(featchPostsByCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categoryPosts = action.payload;
    });

    builder.addCase(featchPostsByCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as ApiError;
    });
  },
});

export const selectAllPost = (state: RootState) =>
  state.categorPosts.categoryPosts;
export const getcategoryPoststatus = (state: RootState) =>
  state.categorPosts.status;
export const getcategoryPostsError = (state: RootState) =>
  state.categorPosts.error;

export default categoryPostslice.reducer;
