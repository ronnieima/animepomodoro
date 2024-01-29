"use server";

import { getServerSession } from "next-auth";
import { AnimeStatusValue } from "../config/content";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { AnimeStatus } from "@tutkli/jikan-ts";

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
