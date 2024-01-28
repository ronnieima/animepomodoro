import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "../app/api/auth/[...nextauth]/options";
import AnimeGridLayoutWrapper from "./AnimeGridLayoutWrapper";
import SelectedAnime from "./SelectedAnime";
import { Separator } from "./ui/separator";
import AnimeCardWrapper from "./AnimeCardWrapper";
import { AnimeListResponse } from "../lib/types/anime-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default async function MALAuthenticatedSection() {
  const session = await getServerSession(options);
  const res = await fetch(
    `https://api.myanimelist.net/v2/users/@me/animelist?status=watching&fields=list_status&limit=1000&sort=list_updated_at`,
    {
      headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
    },
  );
  const animeList: AnimeListResponse = await res.json();
  console.log(animeList);
  console.log(animeList.data.length);
  return (
    <>
      {session && (
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 py-4">
          <SelectedAnime />
          <div>
            <header className="flex flex-col items-center">
              {/* <h2 className="self-start py-8 text-xl font-bold">
                My Currently Watching Anime
              </h2> */}
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
                      <p className="h-full w-full text-center text-sm font-semibold">
                        {anime.node.title}
                      </p>

                      <Separator orientation="horizontal" />

                      <span className="text-center text-muted-foreground">
                        {anime?.list_status.num_episodes_watched} episode
                        {anime?.list_status.num_episodes_watched === 1
                          ? ""
                          : "s"}{" "}
                        watched
                      </span>
                    </>
                  </AnimeCardWrapper>
                );
              })}
            </AnimeGridLayoutWrapper>
          </div>
        </section>
      )}
    </>
  );
}
