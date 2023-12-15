"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ThemeToggle from "@/app/_components/ui/ThemeToggle";
import TypeTags from "./_components/ui/TypeTabs";
import Timer from "./_components/ui/Timer";
import { useCountdown } from "react-countdown-circle-timer";
import { useTimerContext } from "./_contexts/TimerContext";

export default function Home() {
  const { toggleTimer, isPlaying } = useTimerContext();
  return (
    <>
      <nav>
        <ThemeToggle />
      </nav>
      <main className="flex flex-col items-center justify-center gap-16">
        <TypeTags />
        <Timer />
        <Button onClick={toggleTimer} className="">
          {isPlaying ? "Give up" : "Start"}
        </Button>
      </main>
    </>
  );
}
