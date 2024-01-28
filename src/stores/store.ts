import { create } from "zustand";
import { Anime } from "../types/anime-types";

interface AnimeState {
  selectedAnime: Anime | null;
  setSelectedAnime: (anime: Anime) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  selectedAnime: null,
  setSelectedAnime: (anime) =>
    set((state) => ({
      selectedAnime:
        state.selectedAnime?.node.id === anime.node.id ? null : anime,
    })),
}));
