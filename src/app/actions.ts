"use server";

import { Session, getServerSession } from "next-auth";
import { AnimeStatusValue } from "../config/content";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { AnimeListResponse } from "../lib/types/anime-types";

export const generateRandomBase64String = (length = 24) =>
  Buffer.from(crypto.getRandomValues(new Uint8Array(length))).toString(
    "base64url",
  );

export async function setAnimeStatus(
  animeId: number,
  newStatus: AnimeStatusValue,
) {
  const session = await getServerSession(options);
  const res = await fetch(
    `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: new URLSearchParams({ status: newStatus }),
    },
  );
}

export async function updateFilters(status: AnimeStatusValue) {
  redirect(`?status=${status}`);
}

export async function getAnime(searchQuery: string, accessToken?: string) {
  const fetchUrl = searchQuery
    ? `https://api.myanimelist.net/v2/anime?q=${searchQuery}&limit=10`
    : `https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity&limit=10`;

  const res = await fetch(fetchUrl, {
    // @ts-ignore
    headers: { "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID },
  });

  const data: AnimeListResponse = await res.json();
  return data;
}
