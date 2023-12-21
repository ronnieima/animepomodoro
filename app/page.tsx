"use client";
import AnimeCards from "./_components/AnimeCards";
import Pagination from "./_components/ui/Pagination";
import SearchBar from "./_components/ui/SearchBar";
import Stats from "./_components/ui/Stats";
import ThemeToggle from "./_components/ui/ThemeToggle";
import Timer from "./_components/ui/Timer";
import TimerControl from "./_components/ui/TimerControls";
import TypeTabs from "./_components/ui/TypeTabs";

export default function Home() {
  return (
    <main className=" h-full min-h-[100svh] ">
      <section className="flex flex-col items-center  justify-center gap-8 py-48">
        <ThemeToggle />
        <TypeTabs />
        <Timer />
        <TimerControl />
        <Stats />
      </section>
      <section>
        <SearchBar />
        <Pagination />
        <AnimeCards />
        <Pagination />
      </section>
    </main>
  );
}
