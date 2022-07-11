import { createSlice } from "@reduxjs/toolkit";
import fetchNews from "./API/NewsAPI";

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
            state.benchmark = Date.now();
        },
        [fetchNews.fulfilled]: (state, { payload }) => {
            state.loading = false;
            const requestTime = Date.now() - state.benchmark;
            state.posts = payload;
            state.info = `Нашлось ${payload.length} новостей за ${requestTime} мс`
        },
        [fetchNews.rejected]: (state, { payload }) => {
            state.loading = false;
            state.posts = [];
            const status = payload.status || 'Неизвестный статус';
            const msg = payload.message || 'Без сообщения';
            state.info = 'При запросе произошла ошибка :' + msg + ' Статус: ' + status;
        }
    }
});

//export {fetchNews} = feedSlice.actions;

export default feedSlice.reducer