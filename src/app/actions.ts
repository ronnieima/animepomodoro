"use server";

import { Session, getServerSession } from "next-auth";
import {
  AnimeSortOption,
  AnimeStatusOption,
  BASE_URL,
} from "../config/content";
import { AnimeListResponse } from "../lib/types/anime-types";
import { options } from "./api/auth/[...nextauth]/options";
import { revalidateTag } from "next/cache";

export async function updateAnimeStatus(
  animeId: number,
  newStatusOrEpisodeCount: AnimeStatusOption | number,
): Promise<void> {
  try {
    let params;
    if (typeof newStatusOrEpisodeCount === "number")
      params = new URLSearchParams({
        num_watched_episodes: newStatusOrEpisodeCount.toString(),
      });
    else params = new URLSearchParams({ status: newStatusOrEpisodeCount });

    const session = await getServerSession(options);

    await fetch(
      `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: params.toString(),
      },
    );
    revalidateTag("userAnimeList");
  } catch (error: any) {
    throw error;
  }
}

export async function fetchAnimeTotalEpisodes(animeId: number) {
  const session = await getServerSession(options);
  const res = await fetch(`${BASE_URL}/anime/${animeId}?fields=num_episodes`, {
    headers: { Authorization: `Bearer ${session?.user.accessToken}` },
  });
  const data = await res.json();
  return data.num_episodes;
}

export async function fetchUserAnimeList(
  session: Session,
  status: AnimeStatusOption = "watching",
  sort: AnimeSortOption = "list_updated_at",
): Promise<AnimeListResponse> {
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

export async function fetchTopAnime(
  searchQuery: string,
): Promise<AnimeListResponse> {
  const fetchUrl = searchQuery
    ? `${BASE_URL}/anime?q=${searchQuery}&limit=10`
    : `${BASE_URL}/anime/ranking?ranking_type=bypopularity&limit=10`;

  const res = await fetch(fetchUrl, {
    headers: {
      "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID!,
    },
  });

  const data = await res.json();

  return data;
}
