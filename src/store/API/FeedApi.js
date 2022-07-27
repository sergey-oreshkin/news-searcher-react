import { createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from './APISetup';
import $axios from './AxiosInterceptor';

const fetchNews = createAsyncThunk(
    'post/getNews',
    async (data, { rejectWithValue }) => {
        try {
            const endpoint = baseUrl + '/';
            const config = {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            };
            const response = await $axios.post(endpoint, JSON.stringify(data), config);
            return response.data;
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.status !== 0) {
                    return rejectWithValue({ data: err.response.data, status: err.response.status });
                }
                return rejectWithValue({ data: { error: 'Сервер не доступен!' } });
            }
            return rejectWithValue({ data: { error: 'Неизвестная ошибка ' + err } });
        }
    }
);

export default fetchNews;