"use client";
import AnimeSection from "./_components/AnimeSection";
import MainHeader from "./_components/ui/MainHeader";
import SpotifyPlayer from "./_components/ui/SpotifyPlayer";
import Stats from "./_components/ui/Stats";
import ThemeToggle from "./_components/ui/ThemeToggle";
import Timer from "./_components/ui/Timer";
import TimerControl from "./_components/ui/TimerControls";
import TypeTabs from "./_components/ui/TypeTabs";

export default function Home() {
  return (
    <main className=" h-full min-h-[100svh] ">
      <section className="relative flex flex-col  items-center justify-center gap-8 py-48">
        <MainHeader />
        <ThemeToggle />
        <TypeTabs />
        <Timer />
        <TimerControl />
        <Stats />
        <SpotifyPlayer />
      </section>
      <AnimeSection />
    </main>
  );
}
