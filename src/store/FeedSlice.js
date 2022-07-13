import { createSlice } from "@reduxjs/toolkit";
import fetchNews from "./API/NewsApi";

let benchmark = 0;

export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [],
        loading: false
    },
    reducers: {},
    extraReducers: {
        [fetchNews.pending]: (state) => {
            state.loading = true;
            benchmark = Date.now();
        },
        [fetchNews.fulfilled]: (state, { payload }) => {
            state.loading = false;
            const requestTime = Date.now() - benchmark;
            state.posts = payload;
            state.info = `Нашлось ${payload.length} новостей за ${requestTime} мс`
        },
        [fetchNews.rejected]: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            state.posts = [];
            if (message) {
                state.info = 'При запросе произошла ошибка :' + message;
            } else {
                const st = status || 'Неизвестный статус';
                const msg = data?.data?.message || 'Без сообщения';
                state.info = 'При запросе произошла ошибка : ' + msg + ' Статус: ' + st;
            }
        }
    }
});

export default feedSlice.reducer