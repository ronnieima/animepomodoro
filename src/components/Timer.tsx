"use client";
import renderTime from "@/src/components/renderTime";
import { useTheme } from "next-themes";
import { useRef } from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useBoundStore } from "../lib/zustand/bounded-store";

function Timer() {
  const time = useBoundStore((state) => state.time);
  const key = useBoundStore((state) => state.key);
  const timerState = useBoundStore((state) => state.timerState);
  const timerMode = useBoundStore((state) => state.timerMode);
  const finishTimer = useBoundStore((state) => state.finishTimer);

  const { theme } = useTheme();

  function handleColor(currentStage: string) {
    switch (currentStage) {
      case "pomodoro":
        return theme === "dark" ? "#DFCCFB" : "#BEADFA";
      case "animeBreak":
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
          finishTimer();
        }}
        isPlaying={timerState === "running"}
        size={300}
        duration={time}
        strokeWidth={24}
        colors={handleColor(timerMode)}
        trailColor={theme === "dark" ? "#31304D" : "#B6BBC4"}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
