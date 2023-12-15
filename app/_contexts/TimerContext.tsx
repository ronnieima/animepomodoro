"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type StateType = {
  isPlaying: boolean;
  time: number;
  shortBreakCount: number;
  longBreakCount: number;
  key: number;
};

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const enum REDUCER_ACTION_TYPE {
  START_TIMER,
  END_TIMER,
}

export const TimerContext = createContext({});

const initialState = {
  isPlaying: false,
  time: 1,
  shortBreakCount: 0,
  longBreakCount: 0,
  key: 0,
};

function reducer(state: StateType, action: ReducerAction) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.START_TIMER: {
      return { ...state, isPlaying: true };
    }
    case REDUCER_ACTION_TYPE.END_TIMER: {
      return { ...state, isPlaying: false };
    }
  }
}

export function TimerContextProvider({ children }: PropsWithChildren) {
  const [{ time, shortBreakCount }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <TimerContext.Provider
      value={{ toggleTimer, time, shortBreakCount, dispatch }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "useTimerContext must be used within TimerContextProvider.",
    );
  }
  return context;
}

function toggleTimer() {
  dispatch({ type: "timer/toggleIsPlaying" });
}
