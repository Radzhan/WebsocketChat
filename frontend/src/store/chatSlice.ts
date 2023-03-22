import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Post, User } from "../types";
interface chatState {
  users: User[];
  posts: Post[];
}

const initialState: chatState = {
  users: [],
  posts: [],
};

export const getUsers = createAsyncThunk<User[]>('chat/users', async () => {
  const response = await axiosApi.get('/users');

  return response.data;
});

export const getPosts = createAsyncThunk<Post[]>('chat/posts', async () => {
  const response = await axiosApi.get('/posts');

  return response.data;
});

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  }
});

export const chatReducer = chatSlice.reducer;

export const Users = (state: RootState) => state.chat.users;
export const Posts = (state: RootState) => state.chat.posts;
