import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  isOpenMusicPlayer: boolean;
};

const initialState: StateType = {
  isOpenMusicPlayer: false,
};

export const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    toggleMusicPlayerVisibility: (state) => {
      state.isOpenMusicPlayer = !state.isOpenMusicPlayer;
    },
  },
});

export const { toggleMusicPlayerVisibility } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
