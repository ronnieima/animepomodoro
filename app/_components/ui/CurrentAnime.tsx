import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import AnimeEpisodes from "./AnimeEpisodes";

type CurrentAnimeType = {
  selectedAnime: { anime: Anime; episodeCount: number };
};

function CurrentAnime({ selectedAnime }: CurrentAnimeType) {
  const { anime } = selectedAnime;
  return (
    <section className="flex w-full flex-col items-center gap-4 pb-16">
      <span>Currently Watching: </span>

      <div className="text-center">
        <p className=" text-4xl font-semibold">{`${
          anime?.title ?? anime?.title_english ?? "Could not find title."
        }`}</p>
        <p className="font-bold text-muted-foreground">
          {anime?.title_japanese}
        </p>
      </div>

      <Image
        src={anime?.images.jpg.image_url}
        alt={anime?.title}
        height={200}
        width={300}
        className="h-auto w-[300px]"
      />
      <AnimeEpisodes selectedAnime={selectedAnime} />
    </section>
  );
}

export default CurrentAnime;
