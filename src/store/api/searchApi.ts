import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiClient } from "../../utils/axiosInstance";
import { ApiError } from "../loginSlice";
import { Post, SearchRequest } from "../searchSlice";


export const search = createAsyncThunk<Post[], SearchRequest, { rejectValue: ApiError }>(
    'search/post',
    async (searchParams: SearchRequest, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/', JSON.stringify(searchParams));
            return response.data as Post[];
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return rejectWithValue({ data: err.response?.data, status: err.response?.status })
                }
                return rejectWithValue({ data: { error: 'Сервер не доступен!' } });
            }
            return rejectWithValue({ data: { error: 'Неизвестная ошибка ' + err } });
        }
    }
);