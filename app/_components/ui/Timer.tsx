"use client";
import { finishEpisode, finishPomodoro } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const {
    pomodoroMinutes,
    episodeMinutes,
    longBreakMinutes,
    key,
    isPlaying,
    timerState,
  } = useSelector((state: RootState) => state.timer);

  function handleDecrement(totalElapsedTime: number) {
    switch (timerState) {
      case "pomodoro":
        dispatch(finishPomodoro());
      case "anime":
        dispatch(finishEpisode());
      case "longBreak":
        return;
      default:
        throw new Error("Timer state not recognized.");
    }
  }

  function handleColor(timerState: string) {
    switch (timerState) {
      case "pomodoro":
        return "#163020";
      case "anime":
        return "#B6C4B6";
      case "longBreak":
        return "#EEF0E5";
      default:
        throw new Error("Timer state not recognized.");
    }
  }

  function handleTime(timerState: string) {
    switch (timerState) {
      case "pomodoro":
        return pomodoroMinutes;
      case "anime":
        return episodeMinutes;
      case "longBreak":
        return longBreakMinutes;
      default:
        throw new Error("Timer state not recognized.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <CountdownCircleTimer
        key={key}
        onComplete={handleDecrement}
        isPlaying={isPlaying}
        size={360}
        duration={handleTime(timerState)}
        strokeWidth={32}
        colors={handleColor(timerState)}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
