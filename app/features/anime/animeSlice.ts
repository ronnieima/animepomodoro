import { createSlice } from "@reduxjs/toolkit";
import { Anime } from "@tutkli/jikan-ts";

type StateType = {
  searchQuery: string;
  selectedAnime: { anime: Anime; episodeCount: number };
};

const initialState: StateType = {
  searchQuery: "",
  selectedAnime: { anime: undefined!, episodeCount: 0 },
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedAnime: (state, action) => {
      state.selectedAnime.anime = action.payload;
    },
    setEpisodeCount: (state, action) => {
      state.selectedAnime.episodeCount = action.payload;
    },
    decrementEpisodeCount: (state) => {
      if (state.selectedAnime.episodeCount > 0)
        state.selectedAnime.episodeCount -= 1;
    },
    incrementEpisodeCount: (state) => {
      if (state.selectedAnime.episodeCount < state.selectedAnime.anime.episodes)
        state.selectedAnime.episodeCount += 1;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedAnime,
  setEpisodeCount,
  decrementEpisodeCount,
  incrementEpisodeCount,
} = animeSlice.actions;
export default animeSlice.reducer;
