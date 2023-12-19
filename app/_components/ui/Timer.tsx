"use client";
import { finishEpisode, finishPomodoro } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const { time, key, isPlaying, timerState } = useSelector(
    (state: RootState) => state.timer,
  );

  function handleComplete() {
    switch (timerState) {
      case "pomodoro":
        return finishPomodoro;
      case "anime":
        return finishEpisode;
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

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          console.log(handleComplete);
        }}
        isPlaying={isPlaying}
        size={360}
        duration={time}
        strokeWidth={32}
        colors={handleColor(timerState)}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
