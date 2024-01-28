import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "../app/api/auth/[...nextauth]/options";
import AnimeGridLayoutWrapper from "./AnimeGridLayoutWrapper";
import SelectedAnime from "./SelectedAnime";
import { Separator } from "./ui/separator";
import AnimeCardWrapper from "./AnimeCardWrapper";
import { AnimeListResponse } from "../types/anime-types";

export default async function MALAuthenticatedSection() {
  const session = await getServerSession(options);
  const res = await fetch(
    `https://api.myanimelist.net/v2/users/@me/animelist?status=watching&fields=list_status`,
    {
      headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
    },
  );
  const animeList: AnimeListResponse = await res.json();
  return (
    <>
      {session && (
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-2.5 py-4">
          <SelectedAnime />

          <header className="flex flex-col items-center">
            <h2 className="py-8 text-center text-5xl font-bold">
              My Currently Watching Anime
            </h2>
          </header>
          <AnimeGridLayoutWrapper>
            {animeList?.data?.map((anime): any => {
              return (
                <AnimeCardWrapper anime={anime} key={anime.node.title}>
                  <>
                    <Image
                      src={anime.node.main_picture?.large || "/no-image.png"}
                      alt={anime.node.title}
                      height={200}
                      width={300}
                      className="shadow-xl"
                      style={{ width: "200px", height: "auto" }}
                    />
                    <p className="h-full w-full text-center font-semibold">
                      {anime.node.title}
                    </p>

                    <Separator orientation="horizontal" />

                    <span className="text-center text-muted-foreground">
                      {anime?.list_status.num_episodes_watched} episodes watched
                    </span>
                  </>
                </AnimeCardWrapper>
              );
            })}
          </AnimeGridLayoutWrapper>
        </section>
      )}
    </>
  );
}
