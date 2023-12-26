import { createSlice } from "@reduxjs/toolkit";

export const TIME_STEP = 60 * 5;

type StateType = {
  time: number;
  pomodoroMinutes: number;
  episodeMinutes: number;
  longBreakMinutes: number;

  timerState: "pomodoro" | "anime" | "longBreak";

  pomodoroCount: number;
  episodesWatchedCount: number;
  longBreakCount: number;

  isPlaying: boolean;
  key: number;
};

const initialState: StateType = {
  time: 2700,
  pomodoroMinutes: 60 * 45,
  episodeMinutes: 60 * 20,
  longBreakMinutes: 60 * 60,
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
      switch (state.timerState) {
        case "pomodoro":
          state.time = state.pomodoroMinutes;
          break;
        case "anime":
          state.time = state.episodeMinutes;
          break;
        case "longBreak":
          state.time = state.longBreakMinutes;
          break;
        default:
          throw new Error("Timer state not recognized.");
      }
    },
    startTimer: (state, action) => {
      state.isPlaying = true;
      switch (state.timerState) {
        case "pomodoro":
          state.pomodoroMinutes = action.payload;
          break;
        case "anime":
          state.episodeMinutes = action.payload;
          break;
        case "longBreak":
          state.longBreakMinutes = action.payload;
          break;
        default:
          throw new Error("Timer state not recognized.");
      }
    },
    cancelTimer: (state) => {
      state.isPlaying = false;
      state.key += 1;
    },
    finishTimer: (state) => {
      // stops and rerenders the timer regardless of current state
      state.isPlaying = false;
      state.key += 1;

      switch (state.timerState) {
        case "pomodoro":
          state.pomodoroCount += 1;
          if (state.pomodoroCount % 4 === 0) {
            state.timerState = "longBreak";
            state.time = state.longBreakMinutes;
          } else {
            state.timerState = "anime";
            state.time = state.episodeMinutes;
          }
          break;
        case "anime":
          state.episodesWatchedCount += 1;
          state.timerState = "pomodoro";
          state.time = state.pomodoroMinutes;
          break;

        case "longBreak":
          state.longBreakCount += 1;
          state.timerState = "pomodoro";
          state.time = state.pomodoroMinutes;
          break;
      }
    },

    incrementTime: (state) => {
      if (state.time === 7200) state.time = 7200;
      else state.time += TIME_STEP;
    },
    decrementTime: (state) => {
      // prevents timer from going to 00:00
      if (!state.isPlaying && state.time <= TIME_STEP) {
        state.time = TIME_STEP;
      } else {
        state.time -= TIME_STEP;
      }
    },
  },
});

export const {
  startTimer,
  cancelTimer,
  finishTimer,
  incrementTime,
  decrementTime,
  updateTimerState,
} = timerSlice.actions;

export default timerSlice.reducer;
