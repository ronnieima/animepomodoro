import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "@/src/features/timer/timerSlice";
import animeReducer from "@/src/features/anime/animeSlice";
import musicPlayerReducer from "@/src/features/music/musicPlayerSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    anime: animeReducer,
    musicPlayer: musicPlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
