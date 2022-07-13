import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {storageKeys} from './APISetup';
import baseUrl from './APISetup';

const fetchNews = createAsyncThunk(
    'post/getNews',
    async (data, { rejectWithValue }) => {
        try {
            const token = window.localStorage.getItem(storageKeys.tokenKey);
            let endpoint = baseUrl + '/';
            let config = {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            };

            if (token) {
                endpoint+= 'auth';
                config = {
                    headers: { 
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                        'Authorization': token
                     }
                }
            };
            console.log(endpoint);
            const response = await axios.post(
                endpoint,
                JSON.stringify(data),
                config
            );
            return response.data;
        } catch (err) {
            if (err.isAxiosError) {
                if (err.response.data) {
                    return rejectWithValue({ data: err.response.data, status: err.response.status });
                }
                return rejectWithValue({ message: 'Сервер не доступен!' });
            }
            return rejectWithValue({ message: 'Неизвестная ошибка' + err });
        }
    }
);

export default fetchNews;