import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./appSlice";
import LoginSlice from "./loginSlice";
import SearchSlice from "./searchSlice";

export const store = configureStore({
    reducer: {
        login: LoginSlice,
        app: AppSlice,
        search: SearchSlice
    }
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;