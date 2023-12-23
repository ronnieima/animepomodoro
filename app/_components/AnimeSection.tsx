import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnimeCards from "./ui/AnimeCards";
import CurrentAnime from "./ui/CurrentAnime";
import SearchBar from "./ui/SearchBar";

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
