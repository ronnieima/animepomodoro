"use server";

import { Session, getServerSession } from "next-auth";
import { AnimeStatusValue, BASE_URL } from "../config/content";
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
  redirect(`?mal=true&status=${status}`);
}

export async function getAnime(
  searchQuery: string,
  status = "watching",
  session?: Session,
) {
  let fetchUrl;
  if (session?.user?.accessToken) {
    fetchUrl = `${BASE_URL}users/@me/animelist?fields=list_status&status=${status}`;
  } else {
    fetchUrl = searchQuery
      ? `https://api.myanimelist.net/v2/anime?q=${searchQuery}&limit=10&status=status`
      : `https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity&limit=10`;
  }

  let headers: Record<string, string> = {};

  if (session) {
    headers["Authorization"] = `Bearer ${session.user.accessToken}`;
  } else if (process.env.MAL_CLIENT_ID) {
    headers["X-MAL-CLIENT-ID"] = process.env.MAL_CLIENT_ID;
  }

  const options = { headers };

  const res = await fetch(fetchUrl, options);

  const data: AnimeListResponse = await res.json();
  return data;
}
