import { baseURL } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export const baseService = axios.create({
  baseURL,
});

export const fillToken = async (autorization: string) => {
  try {
    await AsyncStorage.setItem("user", autorization);
    let toast = Toast.show("Токен успешно зафиксирован", {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
    baseService.defaults.headers.common.Authorization = `Bearer ${autorization}`;
  } catch (error) {
    let toast = Toast.show(`Ошибка при фиксации токена${error}`, {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
  }
};

export const attachToken = async (autorization: string) => {
  try {
    baseService.defaults.headers.common.Authorization = `Bearer ${autorization}`;
    let toast = Toast.show("Токен успешно отправлен", {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
  } catch (error) {
    let toast = Toast.show(`Ошибка при отправке токена${error}`, {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    let toast = Toast.show("Данные успешно удалены", {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
  } catch (error) {
    let toast = Toast.show(`Ошибка при удалении данных${error}`, {
      duration: Toast.durations.LONG,
      backgroundColor: "green",
      opacity: 1,
      animation: true,
      position: Toast.positions.BOTTOM - 50,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
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
