import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FeedReducer from './FeedSlice';

const rootReducer = combineReducers({
  feed: FeedReducer
});

export const store = configureStore({
  reducer: rootReducer
});
