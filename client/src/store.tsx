import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./feature/comments/commentSlice";
import counterReducer from "./feature/counter/counterSlice";
import categoryReducer from "./feature/posts/CategoryPostSlice";
import postsReducer from "./feature/posts/postSlice";
import usersReducer from "./feature/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    counter: counterReducer,
    categorPosts: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
