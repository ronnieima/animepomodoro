"use client";
import React from "react";
import { useBoundStore } from "../lib/zustand/bounded-store";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";

export default function AnimeCard({ anime }: { anime: any }) {
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);
  return (
    <Card
      onClick={() => setSelectedAnime(anime)}
      className="flex w-48 flex-col items-center rounded-xl p-4 transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-64"
      key={anime.node.id}
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

        <p className="h-full w-full text-center text-base font-semibold">
          {anime?.node.title}
        </p>
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
    </Card>
  );
}
