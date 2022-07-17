import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FeedReducer from './FeedSlice';
import LoginReducer from './LoginSlice';
import RssSlice from './RssSlice';

const rootReducer = combineReducers({
  feed: FeedReducer,
  login: LoginReducer,
  rss: RssSlice
});

export const store = configureStore({
  reducer: rootReducer
});
