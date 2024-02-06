import { Suspense } from "react";
import { getAnime } from "../app/actions";
import AnimeCard from "./AnimeCard";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";

type AnimeCardsAuthedType = {
  searchQuery: string;
  mal: string;
};

export default async function AnimeCardsAuthed({
  searchQuery,
}: AnimeCardsAuthedType) {
  const session = await getServerSession(options);
  const animeList = await getAnime(searchQuery, session || undefined);

  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-8">
      {animeList?.data?.map((anime): any => {
        return (
          <Suspense key={anime.node.id} fallback={<div>Loading...</div>}>
            <AnimeCard anime={anime} />
          </Suspense>
        );
      })}
    </div>
  );
}
