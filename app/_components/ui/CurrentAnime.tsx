import { useQuery } from "@tanstack/react-query";
import {
  Anime,
  AnimeEpisode,
  AnimeEpisodeVideo,
  JikanResponse,
} from "@tutkli/jikan-ts";
import Image from "next/image";
import React from "react";

type CurrentAnimeType = {
  selectedAnime: Anime;
};

function CurrentAnime({ selectedAnime }: CurrentAnimeType) {
  const fetchAnime = async (): Promise<JikanResponse<AnimeEpisodeVideo[]>> => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${selectedAnime.mal_id}/videos/episodes`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["anime", selectedAnime.mal_id],
    queryFn: fetchAnime,
  });

  console.log(data);
  return (
    <section className="grid w-full grid-cols-[1fr_2fr] pb-32">
      <div className="flex flex-col items-center justify-center ">
        <span>Currently Watching: </span>
        <Image
          src={selectedAnime.images.jpg.image_url}
          alt={selectedAnime.title}
          height={200}
          width={300}
          className="h-auto w-[300px]"
        />
      </div>

      <div>
        <p className="text-4xl font-semibold">{`${selectedAnime.title_english} | ${selectedAnime.title_japanese}`}</p>
        <div className="flex flex-wrap gap-16">
          {data?.data?.map((episode) => (
            <div key={episode.mal_id}>{episode.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CurrentAnime;
