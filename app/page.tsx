"use client";

import { useDispatch, useSelector } from "react-redux";
import Controls from "./_components/ui/Controls";
import PomodoroTimer from "./_components/ui/timers/PomodoroTimer";
import { RootState } from "./store";

export default function Home() {
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);
  const dispatch = useDispatch();
  console.log(isPlaying);
  const { pomodoroCount, shortBreakCount } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <section className={` flex items-center justify-center gap-16`}>
        <PomodoroTimer />
      </section>

      <Controls />

      <div className="text-center">
        <h2>Pomodoros Completed: {pomodoroCount} </h2>
        <h2>Episodes Watched: {shortBreakCount} </h2>
      </div>
    </main>
  );
}
