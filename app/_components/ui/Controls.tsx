import {
  decrementTime,
  startTimer,
  incrementTime,
  endTimer,
} from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Controls() {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);

  function handleStartClick() {
    if (isPlaying) {
      dispatch(endTimer());
    } else {
      dispatch(startTimer());
    }
  }

  return (
    <section className="flex gap-8">
      <Button onClick={() => dispatch(decrementTime())}>-</Button>

      <Button
        className=""
        onClick={() => {
          if (isPlaying) dispatch(endTimer());
          else dispatch(startTimer());
        }}
      >
        {isPlaying ? "End" : "Start"}
      </Button>

      <Button onClick={() => dispatch(incrementTime())}>+</Button>
    </section>
  );
}

export default Controls;
