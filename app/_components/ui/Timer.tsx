"use client";
import { finishTimer } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import renderTime from "@/app/util/renderTime";
import { useTheme } from "next-themes";
import { useRef } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const { time, key, isPlaying, timerState } = useSelector(
    (state: RootState) => state.timer,
  );
  const { theme } = useTheme();

  function handleColor(timerState: string) {
    switch (timerState) {
      case "pomodoro":
        return theme === "dark" ? "#DFCCFB" : "#BEADFA";
      case "anime":
        return theme === "dark" ? "#618264" : "#D0E7D2";
      case "longBreak":
        return theme === "dark" ? "#FFF2CC" : "#DFA67B";
      default:
        throw new Error("Timer state could not be determined.");
    }
  }
  const completeSound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("done.wav") : undefined,
  );

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          completeSound.current!.play();
          dispatch(finishTimer());
        }}
        isPlaying={isPlaying}
        size={360}
        duration={time}
        strokeWidth={32}
        colors={handleColor(timerState)}
        trailColor={theme === "dark" ? "#31304D" : "#B6BBC4"}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
