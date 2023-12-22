import { useSelector } from "react-redux";
import AnimeCards from "./ui/AnimeCards";
import SearchBar from "./ui/SearchBar";
import { RootState } from "../store";
import CurrentAnime from "./ui/CurrentAnime";

function AnimeSection() {
  const { selectedAnime } = useSelector((state: RootState) => state.anime);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center ">
      {selectedAnime ? (
        <CurrentAnime selectedAnime={selectedAnime} />
      ) : (
        <h2 className="pb-16 text-5xl">Choose your anime.</h2>
      )}

      <SearchBar />
      <AnimeCards />
    </section>
  );
}

export default AnimeSection;
