import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  time: number;
  shortBreakCount: number;
  longBreakCount: number;
  isPlaying: boolean;
  key: number;
};

const initialState: StateType = {
  time: 2700,
  shortBreakCount: 0,
  longBreakCount: 0,
  isPlaying: false,
  key: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    toggleTimer: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    incrementShortBreakCount: (state) => {
      state.shortBreakCount += 1;
    },
    incrementLongBreakCount: (state) => {
      state.longBreakCount += 1;
    },
    incrementTime: (state) => {
      if (state.time === 7200) state.time = 7200;
      else state.time += 300;
    },
    decrementTime: (state) => {
      if (state.time === 0) state.time = 0;
      else state.time -= 300;
    },
  },
});

export const {
  toggleTimer,
  incrementShortBreakCount,
  incrementLongBreakCount,
  incrementTime,
  decrementTime,
} = timerSlice.actions;

export default timerSlice.reducer;
