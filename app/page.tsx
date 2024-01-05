"use client";
import { useSelector } from "react-redux";
import AnimeSection from "./_components/AnimeSection";
import MainHeader from "./_components/ui/MainHeader";
import SpotifyPlayer from "./_components/ui/SpotifyPlayer";
import Stats from "./_components/ui/Stats";
import Timer from "./_components/ui/Timer";
import TimerControl from "./_components/ui/TimerControls";
import TypeTabs from "./_components/ui/TypeTabs";
import { RootState } from "./store";

export default function Home() {
  const { isOpenMusicPlayer } = useSelector(
    (state: RootState) => state.musicPlayer,
  );
  return (
    <main className=" h-full min-h-[100svh] ">
      <section className="relative flex flex-col  items-center justify-center gap-8 py-48">
        <MainHeader />
        <TypeTabs />
        <Timer />
        <TimerControl />
        <Stats />
        {isOpenMusicPlayer && <SpotifyPlayer />}
      </section>
      <AnimeSection />
    </main>
  );
}
