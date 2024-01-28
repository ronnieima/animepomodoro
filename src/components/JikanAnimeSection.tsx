"use client";
import { cn } from "../lib/utils";
import { useBoundStore } from "../lib/zustand/bounded-store";
import AnimeCards from "./AnimeCards";
import CurrentAnime from "./CurrentAnime";
import SearchBar from "./SearchBar";

export default function JikanAnimeSection() {
  const selectedAnime = useBoundStore((state) => state.selectedAnime);
  const timerState = useBoundStore((state) => state.timerState);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-2 py-16">
      {selectedAnime ? (
        <CurrentAnime selectedAnime={selectedAnime} />
      ) : (
        <header className="flex flex-col items-center gap-2 pb-16">
          <h2 className=" text-center  text-5xl font-bold">
            Choose your anime.
          </h2>
          <span className={cn("text-muted-foreground")}>
            Track each episode you watch.
          </span>
        </header>
      )}

      <SearchBar />
      <AnimeCards />
    </section>
  );
}
