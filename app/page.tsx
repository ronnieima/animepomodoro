"use client";

import { useSelector } from "react-redux";
import Controls from "./_components/ui/Controls";
import PomodoroTimer from "./_components/ui/timers/PomodoroTimer";
import { RootState } from "./store";
import { TimerState } from "./features/timer/timerSlice";
import AnimeTimer from "./_components/ui/timers/AnimeTimer";

export default function Home() {
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);
  console.log(isPlaying);
  const { pomodoroCount, episodesWatchedCount, timerState } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <section className={` flex items-center justify-center gap-16`}>
        {timerState === TimerState.POMODORO ? (
          <PomodoroTimer />
        ) : (
          <AnimeTimer />
        )}
      </section>

      <Controls />

      <div className="text-center">
        <h2>Pomodoros Completed: {pomodoroCount} </h2>
        <h2>Episodes Watched: {episodesWatchedCount} </h2>
      </div>
    </main>
  );
}
