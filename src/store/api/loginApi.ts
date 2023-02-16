import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiClient } from "../../utils/axiosInstance";
import { FormType, setModalContent, setShowModal } from "../appSlice";
import { ApiError, Credentials, LoginResponse } from "../loginSlice";


export const register = createAsyncThunk<number, Credentials, { rejectValue: ApiError }>(
    'post/register',
    async (credentials: Credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiClient.post('/register', JSON.stringify(credentials));
            dispatch(setModalContent(FormType.LOGIN_FORM));
            return response.status;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return rejectWithValue({ data: { error: err.message } })
                }
                return rejectWithValue({ data: { error: 'Сервер не доступен!' } });
            }
            return rejectWithValue({ data: { error: 'Неизвестная ошибка ' + err } });
        }
    }
);

export const login = createAsyncThunk<LoginResponse, Credentials, { rejectValue: ApiError }>(
    'post/login',
    async (credentials: Credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiClient.post('/login', JSON.stringify(credentials));
            dispatch(setShowModal(false));
            return response.data as LoginResponse;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return rejectWithValue({ data: { error: err.message } })
                }
                return rejectWithValue({ data: { error: 'Сервер не доступен!' } });
            }
            return rejectWithValue({ data: { error: 'Неизвестная ошибка ' + err } });
        }
    }
);

export const check = createAsyncThunk<number, void, { rejectValue: ApiError }>(
    'get/check',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/check');
            return response.status;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return rejectWithValue({ data: { error: err.message } })
                }
                return rejectWithValue({ data: { error: 'Сервер не доступен!' } });
            }
            return rejectWithValue({ data: { error: 'Неизвестная ошибка ' + err } });
        }
    }
);