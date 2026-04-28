import { configureStore } from '@reduxjs/toolkit';
import authReducer    from './slices/authSlice';
import reminderReducer from './slices/reminderSlice';
import themeReducer   from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth:      authReducer,
    reminders: reminderReducer,
    theme:     themeReducer,
  },
});

export default store;
