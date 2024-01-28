"use client";
import React, { ReactNode } from "react";
import { useAnimeStore } from "../stores/store";
import { Anime } from "../types/anime-types";

export default function AnimeCardWrapper({
  key,
  children,
  anime,
}: {
  key: string;
  children: ReactNode;
  anime: Anime;
}) {
  const setSelectedAnime = useAnimeStore((state) => state.setSelectedAnime);

  return (
    <div
      key={key}
      className="flex w-32 flex-col items-center hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
      onClick={() => setSelectedAnime(anime)}
    >
      {children}
    </div>
  );
}
