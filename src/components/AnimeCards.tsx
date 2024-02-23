import { Suspense } from "react";
import {
  fetchAnimeTotalEpisodes,
  fetchTopAnime,
  fetchUserAnimeList,
} from "../app/actions";
import AnimeCard from "./AnimeCard";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";

export default async function AnimeCards({ searchParams }: SearchParamsType) {
  const { search, status, sort } = searchParams;
  const session = await getServerSession(options);

  const animeList = session
    ? await fetchUserAnimeList(session, status, sort)
    : await fetchTopAnime(search);

  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-8">
      {animeList?.data?.map(async (anime) => {
        return (
          <Suspense key={anime.node.id} fallback={<div>Loading...</div>}>
            <AnimeCard anime={anime} />
          </Suspense>
        );
      })}
    </div>
  );
}
