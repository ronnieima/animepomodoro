"use client";
import { decrementTime, incrementTime } from "@/app/features/timer/timerSlice";
import { Button } from "@/components/ui/button";
import Timer from "./_components/ui/Timer";
import TypeTags from "./_components/ui/TypeTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { toggleTimer } from "./features/timer/timerSlice";

export default function Home() {
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);
  const dispatch = useDispatch();
  console.log(isPlaying);
  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <TypeTags />
      <Timer />
      <section className="flex gap-8">
        <Button onClick={() => dispatch(decrementTime())}>-</Button>

        <Button className="" onClick={() => dispatch(toggleTimer())}>
          {isPlaying ? "Stop" : "Start"}
        </Button>

        <Button onClick={() => dispatch(incrementTime())}>+</Button>
      </section>
    </main>
  );
}
