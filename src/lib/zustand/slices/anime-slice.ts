import { StateCreator, create } from "zustand";
import { Anime } from "../../types/anime-types";
import { TimerSlice } from "./timer-slice";
import { MusicPlayerSlice } from "./music-player-slice";

export interface AnimeSlice {
  searchQuery: string;
  selectedAnime: Anime | null;
  episodeCounts: { [key: string]: number };
  setSelectedAnime: (anime: Anime) => void;
  setSearchQuery: (query: string) => void;
  setEpisodeCount: (anime: Anime) => void;
  incrementEpisodeCount: (animeId: number) => void;
  decrementEpisodeCount: (animeId: number) => void;
}

export const createAnimeSlice: StateCreator<
  AnimeSlice & TimerSlice & MusicPlayerSlice,
  [],
  [],
  AnimeSlice
> = (set) => ({
  searchQuery: "",
  selectedAnime: null,
  episodeCounts: {},

  setSelectedAnime: (anime) =>
    set((state) => {
      return {
        selectedAnime:
          state.selectedAnime?.node.id === anime?.node?.id ? null : anime,
      };
    }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setEpisodeCount: (anime) =>
    set((state) => {
      const { id } = anime.node;
      return {
        episodeCounts: {
          ...state.episodeCounts,
          [id]: anime,
        },
      };
    }),
  decrementEpisodeCount: (animeId) =>
    set((state) => {
      if (state.episodeCounts[animeId] && state.episodeCounts[animeId] > 0) {
        return {
          episodeCounts: {
            ...state.episodeCounts,
            [animeId]: state.episodeCounts[animeId] - 1,
          },
        };
      }
      return state;
    }),

  incrementEpisodeCount: (animeId) =>
    set((state) => {
      if (!state.episodeCounts[animeId] || state.episodeCounts[animeId] < 69) {
        return {
          episodeCounts: {
            ...state.episodeCounts,
            [animeId]: (state.episodeCounts[animeId] || 0) + 1,
          },
        };
      }
      return state;
    }),
});
