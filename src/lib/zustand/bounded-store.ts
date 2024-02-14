import { create } from "zustand";
import { AnimeSlice, createAnimeSlice } from "./slices/anime-slice";
import { TimerSlice, createTimerSlice } from "./slices/timer-slice";
import {
  MusicPlayerSlice,
  createMusicPlayerSlice,
} from "./slices/music-player-slice";

export const useBoundStore = create<
  TimerSlice & AnimeSlice & MusicPlayerSlice
>()((...a) => ({
  ...createAnimeSlice(...a),
  ...createTimerSlice(...a),
  ...createMusicPlayerSlice(...a),
}));
