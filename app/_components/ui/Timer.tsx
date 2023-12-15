"use client";

import {
  completePomodoro,
  incrementShortBreakCount,
} from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";

function Timer({ className }: { className?: string }) {
  const time = useSelector((state: RootState) => state.timer.time);
  const key = useSelector((state: RootState) => state.timer.key);
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);

  const dispatch = useDispatch();

  return (
    <section
      className={` flex items-center justify-center gap-16 ${className}`}
    >
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          dispatch(completePomodoro());
          return { shouldRepeat: false };
        }}
        isPlaying={isPlaying}
        size={360}
        duration={time}
        strokeWidth={32}
        colors="#004777"
      >
        {renderTime}
      </CountdownCircleTimer>
    </section>
  );
}

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  function str_pad_left(string: string, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const finalTime =
    str_pad_left(minutes.toString(), "0", 2) +
    ":" +
    str_pad_left(seconds.toString(), "0", 2);

  return (
    <div className="timer">
      <div className="text-6xl font-semibold">{finalTime}</div>
    </div>
  );
};

export default Timer;
