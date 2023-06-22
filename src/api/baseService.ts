import { baseURL } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseService = axios.create({
  baseURL,
});

export const fillToken = async (autorization: string) => {
  try {
    await AsyncStorage.setItem("user", autorization);
    console.log("Токен успешно зафиксирован");
    baseService.defaults.headers.common.Authorization = `Bearer ${autorization}`;
  } catch (error) {
    console.log("Ошибка при фиксации токена", error);
  }
};

export const attachToken = async (autorization: string) => {
  try {
    baseService.defaults.headers.common.Authorization = `Bearer ${autorization}`;
    console.log("Токен успешно отправлен");
  } catch (error) {
    console.log("Ошибка при отправке токена", error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    console.log("Данные успешно удалены");
  } catch (error) {
    console.log("Ошибка при удалении!", error);
  }
};

baseService.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      logout();
    }
    Promise.reject(err);
  }
);
