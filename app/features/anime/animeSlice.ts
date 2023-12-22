import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  searchQuery: string;
};

const initialState: StateType = {
  searchQuery: "",
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { updateSearchQuery } = animeSlice.actions;
export default animeSlice.reducer;
