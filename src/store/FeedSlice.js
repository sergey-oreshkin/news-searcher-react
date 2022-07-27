import { createSlice } from "@reduxjs/toolkit";
import fetchNews from "./API/FeedApi";

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
            const { data, status } = payload;
            state.loading = false;
            state.posts = [];
            const st = status || 'Неизвестный статус';
            const msg = data.error || 'Без сообщения';
            state.info = 'При запросе произошла ошибка : ' + msg + ' Статус: ' + st;
        }
    }
});

export default feedSlice.reducer