import { useBoundStore } from "@/src/lib/zustand/bounded-store";

function Stats() {
  const pomodoroCount = useBoundStore((state) => state.pomodoroCount);
  const episodesWatchedCount = useBoundStore(
    (state) => state.episodesWatchedCount,
  );
  const longBreakCount = useBoundStore((state) => state.longBreakCount);
  return (
    <div className="z-10 text-center sm:text-2xl">
      <h2>Pomodoros Completed: {pomodoroCount} </h2>
      <h2>Episodes Watched: {episodesWatchedCount} </h2>
      <h2>Long Breaks Completed: {longBreakCount} </h2>
    </div>
  );
}

export default Stats;
