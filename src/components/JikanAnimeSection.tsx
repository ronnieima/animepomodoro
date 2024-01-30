import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { AnimeListResponse } from "../lib/types/anime-types";
import { cn } from "../lib/utils";
import AnimeCard from "./AnimeCard";
import AnimeCardWrapper from "./AnimeCardWrapper";
import SearchBar from "./SearchBar";
import SelectedAnime from "./SelectedAnime";

export default async function JikanAnimeSection() {
  const session = await getServerSession(options);
  const res = await fetch(
    "https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity",
    {
      method: "GET",
      // @ts-ignore
      headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID },
    },
  );
  const data: AnimeListResponse = await res.json();
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-2 py-16">
      <header className="flex flex-col items-center gap-2 pb-16">
        <h2 className=" text-center  text-5xl font-bold">Choose your anime.</h2>
        <span className={cn("text-muted-foreground")}>
          Track each episode you watch.
        </span>
      </header>
      <SelectedAnime />
      <SearchBar />
      <section className="flex max-w-7xl flex-wrap justify-center gap-8">
        {data.data.map((anime) => (
          <div
            key={anime.node.id}
            className="flex w-32 flex-col items-center transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
          >
            <AnimeCard anime={anime} />
          </div>
        ))}
      </section>
      {/* <AnimeCards /> */}
    </section>
  );
}
