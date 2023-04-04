import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import categoryReducer from "./feature/categories/CategorySlice";
import commentsReducer from "./feature/comments/commentSlice";
import postsReducer from "./feature/posts/postSlice";
import usersReducer from "./feature/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    categories: categoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
