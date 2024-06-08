import { SearchParamsType } from "../../../app/page";
import AnimeCard from "./AnimeCard";
import { getServerSession } from "next-auth";
import { options } from "../../../app/api/auth/[...nextauth]/options";
import { BASE_URL } from "../../../config/content";
import { AnimeListResponse } from "../../../lib/types/anime-types";

export default async function AnimeCards({ searchParams }: SearchParamsType) {
  const session = await getServerSession(options);
  const { status, sort } = searchParams;
  const res = await fetch(
    `${BASE_URL}/users/@me/animelist?fields=list_status&limit=100&sort=list_updated_at&status=${
      status || "watching"
    }&sort=${sort || "list_updated_at"}`,
    {
      headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
      next: { tags: ["userAnimeList"] },
    },
  );

  const animeList: AnimeListResponse = await res.json();

  return (
    <div className="flex max-w-7xl flex-wrap justify-center gap-8">
      {!animeList.error ? (
        animeList.data.map(async (anime) => (
          <AnimeCard key={anime.node.id} anime={anime} />
        ))
      ) : (
        <div>Failed to pull list from MyAnimeList: {animeList.error}</div>
      )}
    </div>
  );
}
