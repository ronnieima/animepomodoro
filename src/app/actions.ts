"use server";

import { getServerSession } from "next-auth";
import { AnimeStatusValue } from "../config/content";
import { options } from "./api/auth/[...nextauth]/options";

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
