"use client";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedAnime } from "../app/features/anime/animeSlice";

type AnimeCardProps = {
  key: string | number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  animeTitle: string;
  imageSrc: string;
  imageAlt: string;
};

export default function AnimeCard({
  key,
  onClick,
  animeTitle,
  imageSrc,
  imageAlt,
}: AnimeCardProps) {
  const dispatch = useDispatch();
  return (
    <div
      key={key}
      onClick={onClick}
      className="w-32 hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        height={200}
        width={300}
        className="shadow-xl"
        style={{ width: "200px", height: "auto" }}
      />

      <p className="w-full text-center font-semibold">{animeTitle}</p>
    </div>
  );
}
