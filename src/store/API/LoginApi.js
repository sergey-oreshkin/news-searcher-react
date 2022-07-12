import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from './APISetup';


const config = {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
};

const requestLogin = createAsyncThunk(
    'post/login',
    async (data, { rejectWithValue }) => {
        const endpoint = data.reg ? '/register' : '/login';
        const body = { username: data.username, password: data.password };
        try {
            const response = await axios.post(
                baseUrl + endpoint,
                JSON.stringify(body),
                config
            );
            return { data: response.data, reg: data.reg };
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status !== 0) {
                    return rejectWithValue({ data: err.response.data, status: err.response.status, reg: data.reg });
                }
                return rejectWithValue({message: 'Сервер не доступен!'});
            }
            return rejectWithValue({message:'Неизвестная ошибка' + err});
        }
    }
);

export default requestLogin;