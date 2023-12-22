import AnimeCards from "./ui/AnimeCards";
import SearchBar from "./ui/SearchBar";

function AnimeSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center">
      <SearchBar />
      <AnimeCards />
    </section>
  );
}

export default AnimeSection;
