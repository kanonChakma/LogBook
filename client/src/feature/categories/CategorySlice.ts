import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../common/axios";
import { CategoryType, SinglePostType } from "../../common/types";
import { RootState } from "../../store";

interface ApiError {
  message: string;
  code: number;
}

interface categoryiesState {
  categoryPosts: SinglePostType[];
  categories: CategoryType[];
  status: string;
  error: ApiError;
  isLoading: boolean;
}

const initialState: categoryiesState = {
  categoryPosts: [],
  categories: [],
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

export const fetchCategories = createAsyncThunk<CategoryType[]>(
  "posts/fetchcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("categories/");
      return [...response.data];
    } catch (err: any) {
      return rejectWithValue({
        message: err.message as string,
        code: err.code,
      });
    }
  }
);
export const categorySlice = createSlice({
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

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    });
  },
});

export const selectAllPost = (state: RootState) =>
  state.categories.categoryPosts;
export const getcategoryPoststatus = (state: RootState) =>
  state.categories.status;
export const getcategoryPostsError = (state: RootState) =>
  state.categories.error;

export const getAllCategories = (state: RootState) =>
  state.categories.categories;
export default categorySlice.reducer;
