import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { search } from "./api/searchApi";
import { ApiError } from "./loginSlice";

type SearchState = {
    news: Post[];
    message: string;
}

let bench = 0;

const initialState: SearchState = { news: [], message: '' }

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(search.pending, (state: SearchState) => {
            state.message = 'Ищем...';
            bench = Date.now();
        });

        builder.addCase(search.fulfilled, (state: SearchState, { payload }: PayloadAction<Post[]>) => {
            state.news = payload;
            const requestTime = Date.now() - bench;
            state.message = `Нашлось ${payload.length} новостей за ${requestTime} мс`;
        });

        builder.addCase(search.rejected, (state: SearchState, { payload }: PayloadAction<ApiError | undefined>) => {
            console.log(payload?.data.error);

        });
    }
});

export const { clearMessage } = searchSlice.actions;

export type SearchRequest = {
    keywords: string[];
    hours: number;
}

export type Post = {
    title: string;
    desc: string;
    link: string;
    date: Date;
    sourceName: string;
}

export default searchSlice.reducer;