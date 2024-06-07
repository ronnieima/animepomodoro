"use client";

import React from "react";
import MainHeader from "./MainHeader";
import SpotifyPlayer from "./SpotifyPlayer";
import Stats from "./Stats";
import TimerControl from "./TimerControls";
import TypeTabs from "./TypeTabs";
import Timer from "./Timer";
import { cn } from "../lib/utils";
import { useBoundStore } from "../lib/zustand/bounded-store";

export default function TimerSection() {
  const timerMode = useBoundStore((store) => store.timerMode);
  return (
    <section
      className={cn(`relative min-h-[80svh] transition-all duration-1000`, {
        "bg-[#ba4949]/50  ": timerMode === "pomodoro",
        "bg-[#38858a]/50 ": timerMode === "animeBreak",
        "bg-green-900/50 ": timerMode === "longBreak",
      })}
    >
      <div className="flex h-full  flex-col items-center justify-center gap-4 py-24  sm:gap-8">
        <MainHeader />
        <TypeTabs />
        <Timer />
        <TimerControl />
        <Stats />
        <SpotifyPlayer />
      </div>
    </section>
  );
}
