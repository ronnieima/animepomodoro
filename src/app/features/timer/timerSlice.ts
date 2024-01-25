import { createSlice } from "@reduxjs/toolkit";

export const TIME_STEP = 60 * 5;

type StateType = {
  time: number;
  pomodoroMinutes: number;
  episodeMinutes: number;
  longBreakMinutes: number;

  currentStage: "pomodoro" | "anime" | "longBreak";
  timerState: "playing" | "paused" | "stopped";
  pomodoroCount: number;
  episodesWatchedCount: number;
  longBreakCount: number;
  key: number;
};

const initialState: StateType = {
  time: 2700,
  pomodoroMinutes: 60 * 45,
  episodeMinutes: 60 * 20,
  longBreakMinutes: 60 * 60,
  currentStage: "pomodoro",
  timerState: "stopped",
  pomodoroCount: 0,
  episodesWatchedCount: 0,
  longBreakCount: 0,
  key: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updatecurrentStage: (state, action) => {
      state.currentStage = action.payload;
      switch (state.currentStage) {
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
      state.timerState = "playing";
      switch (state.currentStage) {
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
      state.timerState = "stopped";
      state.key += 1;
    },
    finishTimer: (state) => {
      // stops and rerenders the timer regardless of current state
      state.timerState = "stopped";
      state.key += 1;

      switch (state.currentStage) {
        case "pomodoro":
          state.pomodoroCount += 1;
          if (state.pomodoroCount % 4 === 0) {
            state.currentStage = "longBreak";
            state.time = state.longBreakMinutes;
          } else {
            state.currentStage = "anime";
            state.time = state.episodeMinutes;
          }
          break;
        case "anime":
          state.episodesWatchedCount += 1;
          state.currentStage = "pomodoro";
          state.time = state.pomodoroMinutes;
          break;

        case "longBreak":
          state.longBreakCount += 1;
          state.currentStage = "pomodoro";
          state.time = state.pomodoroMinutes;
          break;
      }
    },
    pauseTimerToggle: (state) => {
      if (state.timerState === "playing") state.timerState = "paused";
      else state.timerState = "playing";
    },

    incrementTime: (state) => {
      if (state.time === 7200) state.time = 7200;
      else state.time += TIME_STEP;
    },
    decrementTime: (state) => {
      // prevents timer from going to 00:00
      if (state.timerState === "stopped" && state.time <= TIME_STEP) {
        state.time = TIME_STEP;
      } else {
        state.time -= TIME_STEP;
      }
    },
  },
});

export const {
  pauseTimerToggle,
  startTimer,
  cancelTimer,
  finishTimer,
  incrementTime,
  decrementTime,
  updatecurrentStage,
} = timerSlice.actions;

export default timerSlice.reducer;
