"use client";
import {
  decrementTime,
  incrementTime,
  pauseTimerToggle,
  startTimer,
} from "@/src/features/timer/timerSlice";
import { RootState } from "@/src/app/store";
import { Button } from "@/src/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import CancelConfirmationDialog from "./CancelConfirmationDialog";
import SkipConfirmationDialog from "./SkipConfirmationDialog";
import { Pause, Play } from "lucide-react";

function TimerControl() {
  const dispatch = useDispatch();
  const { currentStage, time, timerState } = useSelector(
    (state: RootState) => state.timer,
  );
  const currentStageLabel =
    currentStage === "longBreak" ? "long break" : currentStage;
  return (
    <div className="flex gap-8">
      {timerState === "stopped" ? (
        <>
          <Button onClick={() => dispatch(decrementTime())}>-5</Button>
          <Button
            onClick={() => {
              dispatch(startTimer(time));
            }}
          >
            Start {currentStageLabel}
          </Button>
          <Button onClick={() => dispatch(incrementTime())}>+5</Button>
        </>
      ) : (
        <>
          <Button onClick={() => dispatch(pauseTimerToggle())}>
            {timerState === "paused" ? <Play /> : <Pause />}
          </Button>
          <CancelConfirmationDialog />
          <SkipConfirmationDialog />
        </>
      )}
    </div>
  );
}

export default TimerControl;
