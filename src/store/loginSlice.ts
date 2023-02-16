import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REGISTER_SUCCESS_MESSAGE, ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, USERNAME_STORAGE_KEY } from "../utils/constants";
import { check, login, register } from "./api/loginApi";

type LoginState = {
    login: boolean;
    message: string;
    username: string;
}

const initialState: LoginState = { login: false, message: '', username: '' };

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.login = false;
            state.username = '';
            window.localStorage.clear();
        },
        clearMessage: (state) => {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state: LoginState) => {
            state.message = REGISTER_SUCCESS_MESSAGE;
        });

        builder.addCase(register.rejected, (state: LoginState, { payload }: PayloadAction<ApiError | undefined>) => {
            state.message = payload?.data.error || '';
        });

        builder.addCase(login.fulfilled, (state: LoginState, { payload }: PayloadAction<LoginResponse>) => {
            state.username = payload.username;
            state.login = true;
            const storage = window.localStorage;
            storage.setItem(ACCESS_TOKEN_STORAGE_KEY, payload.token);
            storage.setItem(REFRESH_TOKEN_STORAGE_KEY, payload.refresh);
            storage.setItem(USERNAME_STORAGE_KEY, payload.username);
        });

        builder.addCase(login.rejected, (state: LoginState, { payload }: PayloadAction<ApiError | undefined>) => {
            window.localStorage.clear();
            state.message = payload?.data.error || '';
        });

        builder.addCase(check.fulfilled, (state: LoginState) => {
            state.username = window.localStorage.getItem(USERNAME_STORAGE_KEY) as string;
            state.login = true;
        });

        builder.addCase(check.rejected, (state: LoginState) => {
            window.localStorage.clear();
            state.login = false;
            state.username = '';
        });
    }
});

export const { logout, clearMessage } = loginSlice.actions;

export type Credentials = {
    username: string;
    password: string;
}

export type LoginResponse = {
    username: string;
    token: string;
    refresh: string;
}

export type ApiError = {
    data: { error: string };
    status?: number
}

export default loginSlice.reducer;
