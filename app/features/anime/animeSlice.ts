import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  page: number;
  searchQuery: string;
};

const initialState: StateType = {
  page: 1,
  searchQuery: "",
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page === 1) {
        return;
      }
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { incrementPage, decrementPage, setPage, updateSearchQuery } =
  animeSlice.actions;
export default animeSlice.reducer;
