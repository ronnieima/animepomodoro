import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "@/app/features/timer/timerSlice";
import animeReducer from "@/app/features/anime/animeSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    anime: animeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
