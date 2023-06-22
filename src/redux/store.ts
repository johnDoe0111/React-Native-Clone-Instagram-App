import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts/postsSlice";
import authorizationSlice from "./user/authorizationSlice";


const rootReducer = combineReducers({
    authorization: authorizationSlice,
    posts: postsSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;