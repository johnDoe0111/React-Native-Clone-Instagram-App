import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorization, checkAutorization } from "./authorizationAction";
import Toast from "react-native-root-toast";
import { toastConfig } from "../../constants";

const initialState: userState = {
  user: undefined,
  isAdmin: false,
  isLoading: false,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorization.pending, (state) => {
      state.isAdmin = false;
      let toast = Toast.show("идет загрузка...", toastConfig);
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
      state.isLoading = true;
    });
    builder.addCase(
      authorization.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isAdmin = true;
        state.user = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(authorization.rejected, (state) => {
      state.isAdmin = false;
      let toast = Toast.show("Не авторизован", toastConfig);
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
      state.isLoading = false;
    });
    builder.addCase(
      checkAutorization.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isAdmin = true;
        state.user = action.payload;
        let toast = Toast.show("Проверка пользователя успешна", toastConfig);
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 2000);
      }
    );
    builder.addCase(checkAutorization.rejected, (state) => {
      state.isAdmin = false;
      let toast = Toast.show("Такого пользователя нет в системе", toastConfig);
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    });
  },
});

export default authorizationSlice.reducer;
