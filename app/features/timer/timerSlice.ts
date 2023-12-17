import { createSlice } from "@reduxjs/toolkit";

export const TIME_STEP = 60 * 5;

type StateType = {
  time: number;
  timerState: "pomodoro" | "anime" | "longBreak";
  pomodoroCount: number;
  episodesWatchedCount: number;
  longBreakCount: number;
  isPlaying: boolean;
  key: number;
};

const initialState: StateType = {
  time: 2700, //2700
  timerState: "pomodoro",
  pomodoroCount: 0,
  episodesWatchedCount: 0,
  longBreakCount: 0,
  isPlaying: false,
  key: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimerState: (state, action) => {
      state.timerState = action.payload;
    },
    startTimer: (state) => {
      state.isPlaying = true;
    },
    resetTimer: (state) => {
      state.key += 1;
    },
    endTimer: (state) => {
      state.isPlaying = false;
      state.key += 1;
    },
    finishPomodoro: (state) => {
      state.isPlaying = false;
      state.key += 1;
      state.pomodoroCount += 1;
      state.timerState = "anime";
    },
    finishEpisode: (state) => {
      state.isPlaying = false;
      state.key += 1;
      state.episodesWatchedCount += 1;
      state.timerState = "anime";
    },
    incrementEpisodesWatchedCount: (state) => {
      state.episodesWatchedCount += 1;
    },
    incrementLongBreakCount: (state) => {
      state.longBreakCount += 1;
    },
    incrementTime: (state) => {
      if (state.time === 7200) state.time = 7200;
      else state.time += TIME_STEP;
    },
    decrementTime: (state) => {
      if (!state.isPlaying && state.time <= TIME_STEP) {
        state.time = TIME_STEP;
        return;
      }
      if (state.isPlaying && state.time <= TIME_STEP) {
        state.time = 1;
      }

      state.time -= TIME_STEP;
    },
  },
});

export const {
  startTimer,
  endTimer,
  finishPomodoro,
  finishEpisode,
  incrementEpisodesWatchedCount,
  incrementLongBreakCount,
  incrementTime,
  decrementTime,
  updateTimerState,
} = timerSlice.actions;

export default timerSlice.reducer;
