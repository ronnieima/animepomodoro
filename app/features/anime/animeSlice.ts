import { createSlice } from "@reduxjs/toolkit";
import { Anime } from "@tutkli/jikan-ts";

type StateType = {
  searchQuery: string;
  selectedAnime: Anime;
  episodeCounts: { [key: string]: number };
};

const initialState: StateType = {
  searchQuery: "",
  selectedAnime: undefined!,
  episodeCounts: {},
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedAnime: (state, action) => {
      state.selectedAnime = action.payload;
      if (!state.episodeCounts[state.selectedAnime.mal_id]) {
        state.episodeCounts[state.selectedAnime.mal_id] = 0;
      }
    },
    setEpisodeCount: (state, action) => {
      const { animeId } = action.payload;
      state.episodeCounts[animeId] = action.payload;
    },
    decrementEpisodeCount: (state, action) => {
      const animeId = action.payload;
      if (state.episodeCounts[animeId] && state.episodeCounts[animeId] > 0) {
        state.episodeCounts[animeId] -= 1;
      }
    },
    incrementEpisodeCount: (state, action) => {
      const animeId = action.payload;
      if (
        state.episodeCounts[animeId] < state.selectedAnime.episodes ||
        !state.selectedAnime.episodes
      ) {
        state.episodeCounts[animeId] += 1;
      }
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
