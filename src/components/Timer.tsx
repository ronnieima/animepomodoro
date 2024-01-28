"use client";
import { finishTimer } from "@/src/features/timer/timerSlice";
import { RootState } from "@/src/app/store";
import renderTime from "@/src/components/renderTime";
import { useTheme } from "next-themes";
import { useRef } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const { time, key, timerState, currentStage } = useSelector(
    (state: RootState) => state.timer,
  );
  const { theme } = useTheme();

  function handleColor(currentStage: string) {
    switch (currentStage) {
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
        isPlaying={timerState === "playing"}
        size={300}
        duration={time}
        strokeWidth={24}
        colors={handleColor(currentStage)}
        trailColor={theme === "dark" ? "#31304D" : "#B6BBC4"}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
