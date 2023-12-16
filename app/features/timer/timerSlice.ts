import { createSlice } from "@reduxjs/toolkit";

const TIME_STEP = 60;

export enum TimerState {
  POMODORO,
  ANIME,
  LONG_BREAK,
}

type StateType = {
  time: number;
  timerState: TimerState;
  pomodoroCount: number;
  shortBreakCount: number;
  longBreakCount: number;
  isPlaying: boolean;
  key: number;
};

const initialState: StateType = {
  time: 2, //2700
  timerState: TimerState.POMODORO,
  pomodoroCount: 0,
  shortBreakCount: 0,
  longBreakCount: 0,
  isPlaying: false,
  key: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
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
    completePomodoro: (state) => {
      state.isPlaying = false;
      state.key += 1;
      state.pomodoroCount += 1;
      state.timerState = TimerState.ANIME;
    },
    incrementShortBreakCount: (state) => {
      state.shortBreakCount += 1;
    },
    incrementLongBreakCount: (state) => {
      state.longBreakCount += 1;
    },
    incrementTime: (state) => {
      if (state.time === 7200) state.time = 7200;
      else state.time += TIME_STEP;
    },
    decrementTime: (state) => {
      if (state.time === 0) state.time = 0;
      else state.time -= TIME_STEP;
    },
  },
});

export const {
  startTimer,
  endTimer,
  completePomodoro,
  incrementShortBreakCount,
  incrementLongBreakCount,
  incrementTime,
  decrementTime,
} = timerSlice.actions;

export default timerSlice.reducer;
