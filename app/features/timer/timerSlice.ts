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
      if (state.pomodoroCount % 4 === 0 && state.timerState !== "longBreak") {
        state.timerState = "longBreak";
        state.time = state.longBreakMinutes;
      } else {
        state.timerState = "anime";
        state.time = state.episodeMinutes;
      }
    },
    finishEpisode: (state) => {
      state.isPlaying = false;
      state.key += 1;
      state.episodesWatchedCount += 1;
      state.timerState = "pomodoro";
      state.time = state.pomodoroMinutes;
    },
    finishLongBreak: (state) => {
      state.isPlaying = false;
      state.key += 1;
      state.longBreakCount += 1;
      state.timerState = "pomodoro";
      state.time = state.pomodoroMinutes;
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
  endTimer,
  finishPomodoro,
  finishEpisode,
  finishLongBreak,
  incrementEpisodesWatchedCount,
  incrementLongBreakCount,
  incrementTime,
  decrementTime,
  updateTimerState,
} = timerSlice.actions;

export default timerSlice.reducer;
