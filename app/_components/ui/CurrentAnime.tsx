import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import React from "react";

type CurrentAnimeType = {
  selectedAnime: Anime;
};

function CurrentAnime({ selectedAnime }: CurrentAnimeType) {
  return (
    <section className="grid w-full grid-cols-[1fr_2fr] pb-32">
      <div className="flex flex-col items-center justify-center ">
        <span>Currently Watching: </span>
        <Image
          src={selectedAnime.images.jpg.image_url}
          alt={selectedAnime.title}
          height={200}
          width={300}
          className="h-autoo w-[300px]"
        />
      </div>

      <div>
        <p className="text-4xl font-semibold">{selectedAnime.title}</p>
      </div>
    </section>
  );
}

export default CurrentAnime;
