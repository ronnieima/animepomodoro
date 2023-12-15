"use client";

import { useDispatch, useSelector } from "react-redux";
import Controls from "./_components/ui/Controls";
import Timer from "./_components/ui/Timer";
import TypeTags from "./_components/ui/TypeTabs";
import { RootState } from "./store";
import { useEffect } from "react";

export default function Home() {
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);
  const dispatch = useDispatch();
  console.log(isPlaying);
  const pomodoroCount = useSelector(
    (state: RootState) => state.timer.pomodoroCount,
  );

  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <TypeTags />
      <Timer />
      <Controls />
      <h2>Pomodoros Completed: {pomodoroCount} </h2>
    </main>
  );
}
