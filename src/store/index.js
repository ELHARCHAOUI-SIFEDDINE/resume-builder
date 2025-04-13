import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 