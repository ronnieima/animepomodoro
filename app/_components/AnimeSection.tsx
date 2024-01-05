import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnimeCards from "./ui/AnimeCards";
import CurrentAnime from "./ui/CurrentAnime";
import SearchBar from "./ui/SearchBar";
import { cn } from "@/lib/utils";

function AnimeSection() {
  const selectedAnime = useSelector(
    (state: RootState) => state.anime.selectedAnime,
  );
  const timerState = useSelector((state: RootState) => state.timer.timerState);

  if (timerState === "playing") return null;

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-2 py-16">
      {selectedAnime ? (
        <CurrentAnime selectedAnime={selectedAnime} />
      ) : (
        <header className="flex flex-col items-center gap-2 pb-16">
          <h2 className=" text-center text-5xl">Choose your anime.</h2>
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

export default AnimeSection;
