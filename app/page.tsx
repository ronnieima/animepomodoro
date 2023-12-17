"use client";

import { useSelector } from "react-redux";
import Controls from "./_components/ui/Controls";
import Timer from "./_components/ui/Timer";
import TypeTabs from "./_components/ui/TypeTabs";
import { RootState } from "./store";

export default function Home() {
  const { pomodoroCount, episodesWatchedCount, timerState } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <TypeTabs />
      <section className={` flex items-center justify-center gap-16`}></section>
      <Timer />
      <Controls />

      <div className="text-center">
        <h2>Pomodoros Completed: {pomodoroCount} </h2>
        <h2>Episodes Watched: {episodesWatchedCount} </h2>
      </div>
    </main>
  );
}
