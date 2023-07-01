import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPosts, deletePost, editPosts, getPosts } from "./postsAction";

const initialState: postState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<IPost[]>) => {
        state.posts = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(addPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addPosts.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      }
    );
    builder.addCase(addPosts.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(editPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      editPosts.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.posts = state.posts.map((i) =>
          i._id === action.payload._id ? action.payload : i
        );
        state.isLoading = false;
      }
    );
    builder.addCase(editPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<IPost["_id"]>) => {
        state.posts = state.posts.filter((i) => i._id !== action.payload);
        state.isLoading = false;
      }
    );
    builder.addCase(deletePost.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
