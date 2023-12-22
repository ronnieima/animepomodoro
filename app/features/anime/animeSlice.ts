import { createSlice } from "@reduxjs/toolkit";
import { Anime } from "@tutkli/jikan-ts";

type StateType = {
  searchQuery: string;
  selectedAnime: Anime;
};

const initialState: StateType = {
  searchQuery: "",
  selectedAnime: undefined!,
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
    },
  },
});

export const { setSearchQuery, setSelectedAnime } = animeSlice.actions;
export default animeSlice.reducer;
