import AnimeCards from "./ui/AnimeCards";
import SearchBar from "./ui/SearchBar";

function AnimeSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center ">
      <h2 className="pb-16 text-7xl">Choose your anime.</h2>
      <SearchBar />
      <AnimeCards />
    </section>
  );
}

export default AnimeSection;
