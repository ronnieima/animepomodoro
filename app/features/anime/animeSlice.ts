import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  page: number;
};

const initialState: StateType = {
  page: 1,
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
  },
});

export const { incrementPage, decrementPage } = animeSlice.actions;
export default animeSlice.reducer;
