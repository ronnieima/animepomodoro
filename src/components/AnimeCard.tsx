"use client";
import React from "react";
import { useBoundStore } from "../lib/zustand/bounded-store";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { cn } from "../lib/utils";

export default function AnimeCard({ anime }: { anime: any }) {
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);
  return (
    <div
      onClick={() => setSelectedAnime(anime)}
      className="flex w-48 flex-col items-center rounded-xl p-4 transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-64"
      key={anime.node.id}
    >
      <>
        <div className="relative">
          <Image
            src={anime?.node?.main_picture?.large || "/no-image.png"}
            alt={anime?.node?.title}
            height={200}
            width={300}
            className="-z-10 h-full w-full shadow-xl"
            style={{ width: "200px", height: "auto" }}
          />
          <p
            className={cn(
              "absolute bottom-0 left-0 right-0 z-20 my-auto overflow-auto p-2 text-center text-lg font-bold",
              { "text-sm": anime.node.title.length > 20 },
            )}
          >
            {anime?.node.title}
          </p>
          <div className="absolute bottom-0 z-10 h-3/4 w-full bg-gradient-to-t from-black/60 from-70%  to-transparent"></div>
        </div>

        {anime?.list_status?.num_episodes_watched && (
          <>
            <Separator orientation="horizontal" />
            <span className="text-center text-muted-foreground">
              {anime?.list_status?.num_episodes_watched} episode
              {anime?.list_status?.num_episodes_watched === 1 ? "" : "s"}{" "}
              watched
            </span>
          </>
        )}
      </>
    </div>
  );
}
