import { StateCreator } from "zustand";
import { AnimeSlice } from "./anime-slice";
import { MusicPlayerSlice } from "./music-player-slice";
const TIME_STEP = 60 * 5; // 5 mins
const MAX_TIME = 60 * 120; //120 mins
const MIN_TIME = 60 * 5; // 5 mins

export interface TimerSlice {
  time: number;
  pomodoroMinutes: number;
  animeBreakMinutes: number;
  longBreakMinutes: number;

  timerMode: "pomodoro" | "animeBreak" | "longBreak";
  timerState: "running" | "paused" | "stopped";
  pomodoroCount: number;
  episodesWatchedCount: number;
  longBreakCount: number;
  key: number;
  pomodorosUntilLongBreak: number;

  updateTimerMode: (mode: "pomodoro" | "animeBreak" | "longBreak") => void;
  startTimer: (prevMinutes: number) => void;
  cancelTimer: () => void;
  finishTimer: () => void;
  pauseTimerToggle: () => void;
  incrementTime: () => void;
  decrementTime: () => void;
}

export const createTimerSlice: StateCreator<
  TimerSlice & AnimeSlice & MusicPlayerSlice,
  [],
  [],
  TimerSlice
> = (set) => ({
  //INITIAL STATE
  time: 2700,
  pomodoroMinutes: 60 * 45,
  animeBreakMinutes: 60 * 20,
  longBreakMinutes: 60 * 60,
  timerMode: "pomodoro",
  timerState: "stopped",
  pomodoroCount: 0,
  episodesWatchedCount: 0,
  longBreakCount: 0,
  pomodorosUntilLongBreak: 4,
  key: 0,

  // ACTIONS
  updateTimerMode: (newMode) =>
    set((state) => {
      let newTime;
      switch (newMode) {
        case "pomodoro":
          newTime = state.pomodoroMinutes;
          break;
        case "animeBreak":
          newTime = state.animeBreakMinutes;
          break;
        case "longBreak":
          newTime = state.longBreakMinutes;
          break;
        default:
          throw new Error("Timer state not recognized.");
      }
      return { timerMode: newMode, time: newTime };
    }),
  startTimer: (prevMinutes) =>
    set((state) => {
      switch (state.timerMode) {
        case "pomodoro":
          state.pomodoroMinutes = prevMinutes;
          break;
        case "animeBreak":
          state.animeBreakMinutes = prevMinutes;
          break;
        case "longBreak":
          state.longBreakMinutes = prevMinutes;
          break;
        default:
          throw new Error("Timer state not recognized.");
      }
      return { timerState: "running" };
    }),

  cancelTimer: () =>
    set((state) => ({ timerState: "stopped", key: state.key + 1 })),

  finishTimer: () =>
    set((state) => {
      let stateUpdates = {};

      switch (state.timerMode) {
        case "pomodoro":
          const isLongBreakNext =
            (state.pomodoroCount + 1) % state.pomodorosUntilLongBreak === 0;
          stateUpdates = {
            pomodoroCount: state.pomodoroCount + 1,
            timerMode: isLongBreakNext ? "longBreak" : "animeBreak",
            time: isLongBreakNext
              ? state.longBreakMinutes
              : state.animeBreakMinutes,
          };
          break;
        case "animeBreak":
          stateUpdates = {
            episodesWatchedCount: state.episodesWatchedCount + 1,
            timerMode: "pomodoro",
            time: state.pomodoroMinutes,
          };
          break;
        case "longBreak":
          stateUpdates = {
            longBreakCount: state.longBreakCount + 1,
            timerMode: "pomodoro",
            time: state.pomodoroMinutes,
          };
          break;
      }
      return { ...stateUpdates, timerState: "stopped", key: state.key + 1 };
    }),
  pauseTimerToggle: () =>
    set((state) => {
      const isTimerRunning = state.timerState === "running";
      return {
        timerState: isTimerRunning ? "paused" : "running",
      };
    }),
  incrementTime: () =>
    set((state) => {
      const isMaxTimeReached = state.time === MAX_TIME;
      return {
        time: isMaxTimeReached ? MAX_TIME : state.time + TIME_STEP,
      };
    }),
  decrementTime: () =>
    set((state) => {
      // prevents timer from going to 00:00
      const isMinimumTime =
        state.timerState === "stopped" && state.time <= MIN_TIME;
      return { time: isMinimumTime ? MIN_TIME : state.time - TIME_STEP };
    }),
});
