"use client";

import React from "react";
import MainHeader from "./MainHeader";
import SpotifyPlayer from "./SpotifyPlayer";
import Stats from "./Stats";
import TimerControl from "./TimerControls";
import TypeTabs from "./TypeTabs";
import Timer from "./Timer";
import { Boxes } from "./ui/background-boxes";

export default function TimerSection() {
  return (
    <section className="relative ">
      <div className=" flex h-full flex-col items-center justify-center gap-4 py-24 sm:gap-8">
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
