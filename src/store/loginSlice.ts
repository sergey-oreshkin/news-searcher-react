import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REGISTER_SUCCESS_MESSAGE, ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../utils/constants";
import { login, register } from "./api/loginApi";

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
        setLogin: (state, { payload }: PayloadAction<boolean>) => {
            state.login = payload;
        },
        setMessage: (state, { payload }: PayloadAction<string>) => {
            state.message = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state: LoginState) => {
            state.message = REGISTER_SUCCESS_MESSAGE;
        });

        builder.addCase(register.rejected, (state: LoginState, { payload }: PayloadAction<ApiError | undefined>) => {
            state.message = payload?.data.error || '';
        });

        builder.addCase(register.pending, (state)=>{state.message=''});

        builder.addCase(login.fulfilled, (state: LoginState, { payload }: PayloadAction<LoginResponse>) => {
            state.username = payload.username;
            state.login = true;
            const storage = window.localStorage;
            storage.setItem(ACCESS_TOKEN_STORAGE_KEY, payload.token);
            storage.setItem(REFRESH_TOKEN_STORAGE_KEY, payload.refresh);
        });

        builder.addCase(login.rejected, (state: LoginState, { payload }: PayloadAction<ApiError | undefined>) => {
            state.message = payload?.data.error || '';
        });

        builder.addCase(login.pending, (state)=>{state.message=''});

    }
});

export const { setLogin, setMessage } = loginSlice.actions;

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
