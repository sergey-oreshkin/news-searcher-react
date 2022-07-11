import { createSlice } from "@reduxjs/toolkit";
import initializer from "./API/LoginInitializer";
import requestLogin from "./API/LoginApi";
import { storageKeys } from "./API/APISetup";

const LoginSlice = createSlice({
    name: 'login',
    initialState: initializer(),
    reducers: {
        toggleModal: state => { state.showModal = !state.showModal },
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
                    storage.setItem(storageKeys.token, data.token);
                    storage.setItem(storageKeys.username, data.username);
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
            if (!status) {
                state.err = payload;
            } else if (data && data.message) {
                state.err = data.message
            } else if (status === 403) {
                state.err = 'Неверные логин или пароль';
            } else if (reg && status === 400) {
                state.err = 'Похоже имя уже зянято';
            } else {
                state.err = 'Неверные данные';
            }
            state.loading = false;
        }
    }
});

export const { toggleModal, logout } = LoginSlice.actions;

export default LoginSlice.reducer;