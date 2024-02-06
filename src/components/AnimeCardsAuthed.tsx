import { getAnimeUnauthed } from "../app/actions";
import AnimeCard from "./AnimeCard";

type AnimeCardsAuthedType = {
  searchQuery: string;
};

export default async function AnimeCardsAuthed({
  searchQuery,
}: AnimeCardsAuthedType) {
  const animeList = await getAnimeUnauthed(searchQuery);

  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-8">
      {animeList?.data?.map((anime): any => {
        return <AnimeCard key={anime.node.id} anime={anime} />;
      })}
    </div>
  );
}
