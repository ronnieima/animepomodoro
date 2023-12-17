import {
  decrementTime,
  startTimer,
  incrementTime,
} from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelConfirmationDialog from "./CancelConfirmationDialog";

function Controls() {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);

  return (
    <section className="flex gap-8">
      <Button onClick={() => dispatch(decrementTime())}>-</Button>

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

      <Button onClick={() => dispatch(incrementTime())}>+</Button>
    </section>
  );
}

export default Controls;
