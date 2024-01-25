"use client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import AnimeCards from "./AnimeCards";
import CurrentAnime from "./CurrentAnime";
import SearchBar from "./SearchBar";
import { cn } from "@/src/lib/utils";

function AnimeSection() {
  const selectedAnime = useSelector(
    (state: RootState) => state.anime.selectedAnime,
  );
  const timerState = useSelector((state: RootState) => state.timer.timerState);

  return (
    <>
      {timerState !== "playing" && (
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
      )}
    </>
  );
}

export default AnimeSection;
