"use client";
import { finishTimer } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";
import { useTheme } from "next-themes";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const { time, key, isPlaying, timerState } = useSelector(
    (state: RootState) => state.timer,
  );

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
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          dispatch(finishTimer());
        }}
        isPlaying={isPlaying}
        size={360}
        duration={time}
        strokeWidth={32}
        colors={handleColor(timerState)}
        trailColor={theme === "dark" ? "#6a6a6a" : "#6a6a6a"}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
