"use client";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import { Anime } from "../lib/types/anime-types";
import { cn } from "../lib/utils";
import { useBoundStore } from "../lib/zustand/bounded-store";

export default function AnimeCard({ anime }: { anime: Anime }) {
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);

  return (
    <div
      onClick={() => setSelectedAnime(anime)}
      className="w-54 flex flex-col items-center rounded-xl p-4 transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-64"
      key={anime.node.id}
    >
      <>
        <div className="relative">
          <Image
            src={anime?.node?.main_picture?.medium || "/no-image.png"}
            alt={anime?.node?.title}
            height={200}
            width={300}
            className="-z-10 h-full w-full"
            style={{ width: "200px", height: "auto" }}
          />
          <p
            className={cn(
              "absolute bottom-0 left-0 right-0 z-20 my-auto overflow-auto p-2 text-center text-lg font-bold",
              { "text-sm": anime.node.title.length > 30 },
            )}
          >
            {anime?.node.title}
          </p>
          <div className="absolute bottom-0 z-10 h-3/4 w-full bg-gradient-to-t from-neutral-800 from-[20%]  to-transparent"></div>
        </div>

        {anime?.list_status?.num_episodes_watched && (
          <div className="flex w-full justify-between px-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4" />
              <span className="flex  text-center text-muted-foreground">
                {anime?.list_status?.num_episodes_watched}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4" />
              <span className="flex  text-center text-muted-foreground">
                {anime?.list_status?.score || "-"}
              </span>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
