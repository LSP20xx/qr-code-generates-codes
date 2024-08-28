import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./slices/emailSlice";
import uniqueCodeSlice from "./slices/uniqueCodeSlice";

const store = configureStore({
  reducer: {
    email: emailSlice,
    uniqueCode: uniqueCodeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
