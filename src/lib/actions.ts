"use server";

import { getSession } from "next-auth/react";

export async function getMALAnimeList() {
  const session = getSession();
  //   console.log(session);
  //     fetch(
  //       `https://api.myanimelist.net/v2/users/${session.data?.user?.name}/animelist`,
  //       {
  //         headers: { "Authentication:": `Bearer ${session.data?.user?.image}` },
  //       },
  //     );
}
