import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FeedReducer from './FeedSlice';
import LoginReducer from './LoginSlice';

const rootReducer = combineReducers({
  feed: FeedReducer,
  login: LoginReducer
});

export const store = configureStore({
  reducer: rootReducer
});
