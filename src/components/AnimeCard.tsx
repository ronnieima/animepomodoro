"use client";
import Image from "next/image";
import React from "react";
import { Anime } from "../lib/types/anime-types";

type AnimeCardProps = {
  anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div
      key={anime.node.title}
      className="w-32 transition-all hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
    >
      <Image
        src={anime.node.main_picture?.large || "/no-image.png"}
        alt={anime.node.title}
        height={200}
        width={300}
        className="shadow-xl"
        style={{ width: "200px", height: "auto" }}
      />

      <p className="w-full text-center font-semibold">{anime.node.title}</p>
    </div>
  );
}
