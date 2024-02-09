import { Suspense } from "react";
import { getAnime } from "../app/actions";
import AnimeCard from "./AnimeCard";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";

type AnimeCardsAuthedType = {
  searchQuery: string;
  searchParams: { status: string; search: string };
};

export default async function AnimeCardsAuthed({
  searchQuery,
  searchParams,
}: AnimeCardsAuthedType) {
  const session = await getServerSession(options);
  const animeList = await getAnime(
    searchQuery,
    searchParams.status,
    session || undefined,
  );

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
