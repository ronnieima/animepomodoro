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
    <section className="relative ">
      <video
        autoPlay
        muted
        loop
        className="absolute -z-10 h-full w-full object-cover opacity-20 "
      >
        <source src="https://res.cloudinary.com/dfpbpun9z/video/upload/v1704475712/animepomodoro/bg1.mp4" />
      </video>
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 sm:gap-8">
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
