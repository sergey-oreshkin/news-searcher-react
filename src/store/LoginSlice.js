import { createSlice } from "@reduxjs/toolkit";
import initializer from "./API/LoginInitializer";
import requestLogin, { checkToken } from "./API/LoginApi";
import { storageKeys } from "./API/APISetup";

const LoginSlice = createSlice({
    name: 'login',
    initialState: initializer(),
    reducers: {
        toggleModal: state => {
            state.showModal = !state.showModal;
            state.err = '';
        },
        logout: state => {
            const storage = window.localStorage;
            storage.clear();
            state.auth = false;
            state.username = '';
            state.buttonText = 'Вход/Регистрация';
        }
    },
    extraReducers: {
        [requestLogin.pending]: state => {
            state.err = '';
            state.loading = true;
        },
        [requestLogin.fulfilled]: (state, { payload }) => {
            const { data, reg } = payload;
            if (reg) {
                state.err = 'Регистрация прошла успешно';
            } else {
                if (data.token && data.username) {
                    const storage = window.localStorage;
                    storage.setItem(storageKeys.tokenKey, data.token);
                    storage.setItem(storageKeys.usernameKey, data.username);
                    storage.setItem(storageKeys.refreshKey, data.refresh);
                    state.auth = true;
                    state.username = data.username;
                    state.buttonText = 'Выход';
                    state.showModal = false;
                } else {
                    state.err('Непонятный ответ сервера');
                }
            }
            state.loading = false;
        },
        [requestLogin.rejected]: (state, { payload }) => {
            const { data, status, reg } = payload;
            if (status === 403) {
                state.err = 'Неверные логин или пароль';
            } else if (reg && status === 400) {
                state.err = 'Похоже имя уже зянято';
            } else if (data && data.error) {
                state.err = data.error;
            } else {
                state.err = 'Неверные данные';
            }
            state.loading = false;
        },
        [checkToken.fulfilled]: (state, { payload }) => {
            const storage = window.localStorage;
            if (storage.getItem(storageKeys.tokenKey)) {
                state.auth = true;
                state.username = storage.getItem(storageKeys.usernameKey);
                state.buttonText = 'Выход';
                state.showModal = false;
            }
        }
    }
});

export const { toggleModal, logout } = LoginSlice.actions;

export default LoginSlice.reducer;