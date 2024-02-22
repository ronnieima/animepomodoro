"use client";

import React from "react";
import MainHeader from "./MainHeader";
import SpotifyPlayer from "./SpotifyPlayer";
import Stats from "./Stats";
import TimerControl from "./TimerControls";
import TypeTabs from "./TypeTabs";
import Timer from "./Timer";

export default function TimerSection() {
  return (
    <section className="bg-grid-slate-700/50 relative">
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)] dark:bg-black`}
      ></div>

      <div className="flex h-full  flex-col items-center justify-center gap-4 py-24 sm:gap-8">
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
