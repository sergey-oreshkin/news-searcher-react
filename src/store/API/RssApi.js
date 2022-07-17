import { createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from './APISetup';
import $axios from './AxiosInterceptor';

const getRss = createAsyncThunk(
    'post/getRss',
    async (data, { rejectWithValue }) => {
        return refreshRss(rejectWithValue);
    }
);

export const updateAndGetRss = createAsyncThunk(
    'post/postRss',
    async (data, { rejectWithValue }) => {
        try {
            const endpoint = baseUrl + '/rss';
            const config = {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            };
            let resp;
            if (Array.isArray(data)) {
                resp = await $axios.put(endpoint, data, config);
            } else {
                resp = await $axios.post(endpoint, data, config);
            }
            if (resp.code) {
                throw resp;
            }
            return refreshRss(rejectWithValue);
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status !== 0) {
                    return rejectWithValue({ data: err.response.data, status: err.response.status });
                }
                return rejectWithValue({ message: 'Сервер не доступен!' });
            }
            return rejectWithValue({ message: 'Неизвестная ошибка ' + err });
        }
    }
);

async function refreshRss(rejectWithValue) {
    try {
        const endpoint = baseUrl + '/rss';
        const config = {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        };
        const response = await $axios.get(endpoint, config);
        return response.data;
    } catch (err) {
        if (err.isAxiosError) {
            if (err.response.status !== 0) {
                return rejectWithValue({ data: err.response.data, status: err.response.status });
            }
            return rejectWithValue({ message: 'Сервер не доступен!' });
        }
        return rejectWithValue({ message: 'Неизвестная ошибка ' + err });
    }
}

export default getRss;