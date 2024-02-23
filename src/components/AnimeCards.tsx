import { Suspense } from "react";
import {
  fetchAnimeTotalEpisodes,
  fetchTopAnime,
  fetchUserAnimeList,
} from "../app/actions";

import AnimeCard from "./AnimeCard";
import { Session, getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";
import {
  AnimeSortOption,
  AnimeStatusOption,
  BASE_URL,
} from "../config/content";
import { AnimeListResponse } from "../lib/types/anime-types";

export default async function AnimeCards({ searchParams }: SearchParamsType) {
  const { status, sort } = searchParams;

  const animeList = await fetchUserAnimeList(status, sort);

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

export async function fetchUserAnimeList(
  status: AnimeStatusOption = "watching",
  sort: AnimeSortOption = "list_updated_at",
): Promise<AnimeListResponse> {
  const session = await getServerSession(options);
  if (!session) throw new Error("No session");
  const res = await fetch(
    `${BASE_URL}/users/@me/animelist?fields=list_status&limit=100&sort=list_updated_at&status=${status}&sort=${sort}`,
    {
      headers: { Authorization: `Bearer ${session.user.accessToken}` },
      next: { tags: ["userAnimeList"] },
    },
  );
  const data = await res.json();
  return data;
}
