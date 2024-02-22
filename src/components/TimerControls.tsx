"use client";
import { Button } from "@/src/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useBoundStore } from "../lib/zustand/bounded-store";
import CancelConfirmationDialog from "./CancelConfirmationDialog";
import SkipConfirmationDialog from "./SkipConfirmationDialog";
import { convertCamelCaseToWords } from "../lib/utils";

function TimerControl() {
  const time = useBoundStore((state) => state.time);
  const timerState = useBoundStore((state) => state.timerState);
  const timerMode = useBoundStore((state) => state.timerMode);
  const decrementTime = useBoundStore((state) => state.decrementTime);
  const startTimer = useBoundStore((state) => state.startTimer);
  const incrementTime = useBoundStore((state) => state.incrementTime);
  const pauseTimerToggle = useBoundStore((state) => state.pauseTimerToggle);

  const timerModeWords = convertCamelCaseToWords(timerMode);

  return (
    <div className="flex gap-8">
      {timerState === "stopped" ? (
        <>
          <Button onClick={decrementTime}>-5</Button>
          <Button
            onClick={() => {
              startTimer(time);
            }}
          >
            Start {timerModeWords}
          </Button>
          <Button onClick={incrementTime}>+5</Button>
        </>
      ) : (
        <>
          <Button onClick={pauseTimerToggle}>
            {timerState === "paused" ? <Play /> : <Pause />}
            <span className="sr-only">
              {timerState === "paused" ? "Play timer" : "Pause timer"}
            </span>
          </Button>
          <CancelConfirmationDialog />
          <SkipConfirmationDialog />
        </>
      )}
    </div>
  );
}

export default TimerControl;
