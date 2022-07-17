import { createSlice } from "@reduxjs/toolkit";
import getRss, { updateAndGetRss } from "./API/RssApi";
import initializer from "./API/RssInitializer";

const RssSlice = createSlice({
    name: 'rss',
    initialState: initializer(),
    reducers: {},
    extraReducers: {
        [getRss.fulfilled]: (state, { payload }) => {
            if (payload && payload.length !== 0) {
                state.sources = payload;
            } else {
                state.editInfo = 'У вас нет ни одного RSS источника!';
            }
        },
        [getRss.rejected]: (state, { payload }) => {
            const { data, message, status } = payload;
            state.sources = [];
            if (message) {
                state.info = 'При запросе произошла ошибка : ' + message;
            } else {
                const st = status || 'Неизвестный статус';
                const msg = data.data || 'Без сообщения';
                state.info = 'При запросе произошла ошибка : ' + msg + ' Статус: ' + st;
            }
        },
        [updateAndGetRss.fulfilled]: (state, { payload }) => {
            if (payload && payload.length !== 0) {
                state.sources = payload;
                state.addInfo = '';
            } else {
                state.editInfo = 'У вас нет ни одного RSS источника!';
            }
        },
        [updateAndGetRss.rejected]: (state, { payload }) => {
            if (payload && payload.status === 400) {
                const msg = payload.data ? payload.data.error : '';
                state.addInfo = 'Не удалось добавить ' + msg;
            }
        }
    }
});

export default RssSlice.reducer;