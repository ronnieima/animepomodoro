import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";

function Stats() {
  const { pomodoroCount, episodesWatchedCount } = useSelector(
    (state: RootState) => state.timer,
  );
  return (
    <div className="text-center text-2xl">
      <h2>Pomodoros Completed: {pomodoroCount} </h2>
      <h2>Episodes Watched: {episodesWatchedCount} </h2>
    </div>
  );
}

export default Stats;
