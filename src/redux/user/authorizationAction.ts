import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { attachToken, baseService, fillToken } from "../../api/baseService";

export const authorization = createAsyncThunk(
  "authorization",
  async (values: { username: string; password: string }) => {
    const { data } = await baseService.post("/user/sign-in", {
      username: values.username,
      password: values.password,
    });

    fillToken(data.token);
    attachToken(data.token);

    return data;
  }
);

export const checkAutorization = createAsyncThunk(
  "checkAutorization",
  async () => {
    const token = await AsyncStorage.getItem("user");
    attachToken(token as string);

    const { data } = await baseService.get("/user");

    return data;
  }
);
