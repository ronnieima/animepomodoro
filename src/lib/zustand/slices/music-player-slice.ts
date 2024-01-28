import { StateCreator } from "zustand";
import { AnimeSlice } from "./anime-slice";
import { TimerSlice } from "./timer-slice";

export interface MusicPlayerSlice {
  isOpenMusicPlayer: boolean;
  toggleMusicPlayerVisibility: () => void;
}

export const createMusicPlayerSlice: StateCreator<
  MusicPlayerSlice & AnimeSlice & TimerSlice,
  [],
  [],
  MusicPlayerSlice
> = (set) => ({
  isOpenMusicPlayer: false,
  toggleMusicPlayerVisibility: () =>
    set((state) => ({
      isOpenMusicPlayer: state.isOpenMusicPlayer ? false : true,
    })),
});
