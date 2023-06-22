import { IUser, userState } from "../../types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorization, checkAutorization } from "./authorizationAction";

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
      console.log("идет загрузка...");
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
      console.log("Не авторизован");
      state.isLoading = false;
    });
    builder.addCase(
      checkAutorization.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isAdmin = true;
        state.user = action.payload;
        console.log("done!");
      }
    );
    builder.addCase(checkAutorization.rejected, (state) => {
      state.isAdmin = false;
      console.log("error");
    });
  },
});

export default authorizationSlice.reducer;
