import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from './APISetup';

const endpoint = baseUrl + '/';

const config = {
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
};

const fetchNews = createAsyncThunk(
    'post/getNews',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoint,
                JSON.stringify(data),
                config
            );
            return response.data;
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.data) {
                    return rejectWithValue(err.response.data);
                }
                return rejectWithValue('Сервер не доступен!');
            }
            return rejectWithValue('Неизвестная ошибка' + err);
        }
    }
);

export default fetchNews;