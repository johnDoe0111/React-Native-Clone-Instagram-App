import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { attachToken, baseService } from "../../api/baseService";

export const getPosts = createAsyncThunk("getPosts", async () => {
  const { data } = await baseService.get("/posts");
  const token = await AsyncStorage.getItem("user");
  attachToken(token as string);
  return data;
});

export const addPosts = createAsyncThunk(
  "addPosts",
  async (formData: FormData) => {
    const token = await AsyncStorage.getItem("user");
    attachToken(token as string);

    const { data } = await baseService.post("/posts", formData);
    return data;
  }
);

export const editPosts = createAsyncThunk(
  "editPosts",
  async ({ postId, description }: { postId: string; description: string }) => {
    const token = await AsyncStorage.getItem("user");
    attachToken(token as string);

    const { data } = await baseService.patch(`/posts/${postId}`, {
      description,
    });

    return data;
  }
);

export const deletePost = createAsyncThunk("delePost", async (_id: string) => {
  const token = await AsyncStorage.getItem("user");
  attachToken(token as string);

  await baseService.delete(`/posts/${_id}`);

  return _id;
});
