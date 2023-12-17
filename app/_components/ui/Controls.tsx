import {
  decrementTime,
  startTimer,
  incrementTime,
  TIME_STEP,
  finishPomodoro,
} from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelConfirmationDialog from "./CancelConfirmationDialog";

function Controls() {
  const dispatch = useDispatch();
  const { isPlaying, time } = useSelector((state: RootState) => state.timer);

  function handleDecrement() {
    if (time <= TIME_STEP) {
      dispatch(finishPomodoro());
    } else {
      dispatch(decrementTime());
    }
  }

  return (
    <section className="flex gap-8">
      <Button onClick={handleDecrement}>-5</Button>

      {isPlaying ? (
        <CancelConfirmationDialog />
      ) : (
        <Button
          onClick={() => {
            dispatch(startTimer());
          }}
        >
          Start
        </Button>
      )}

      <Button onClick={() => dispatch(incrementTime())}>+5</Button>
    </section>
  );
}

export default Controls;
