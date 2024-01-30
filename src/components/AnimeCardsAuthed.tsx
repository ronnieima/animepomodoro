"use client";
import Image from "next/image";
import { AnimeListResponse } from "../lib/types/anime-types";
import { useBoundStore } from "../lib/zustand/bounded-store";
import { Separator } from "./ui/separator";

export default function AnimeCardsAuthed({
  animeList,
}: {
  animeList: AnimeListResponse;
}) {
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);
  return (
    <section className="flex max-w-7xl flex-wrap justify-center gap-8">
      {animeList?.data?.map((anime): any => {
        return (
          <div
            key={anime.node.id}
            className="flex w-32 flex-col items-center transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
            onClick={() => setSelectedAnime(anime)}
          >
            <>
              <Image
                src={anime?.node?.main_picture?.large || "/no-image.png"}
                alt={anime?.node?.title}
                height={200}
                width={300}
                className="shadow-xl"
                style={{ width: "200px", height: "auto" }}
              />

              <p className="h-full w-full text-center text-sm font-semibold">
                {anime?.node.title}
              </p>

              <Separator orientation="horizontal" />

              <span className="text-center text-muted-foreground">
                {anime?.list_status?.num_episodes_watched} episode
                {anime?.list_status?.num_episodes_watched === 1 ? "" : "s"}
                watched
              </span>
            </>
          </div>
        );
      })}
    </section>
  );
}
