import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import AnimeEpisodes from "./AnimeEpisodes";

type CurrentAnimeType = {
  selectedAnime: Anime;
};

function CurrentAnime({ selectedAnime }: CurrentAnimeType) {
  return (
    <section className="flex w-full flex-col pb-32 sm:grid sm:grid-cols-[1fr_2fr]">
      <div className="order-2 flex flex-col items-center justify-center sm:order-1">
        <span>Currently Watching: </span>
        <Image
          src={selectedAnime.images.jpg.image_url}
          alt={selectedAnime.title}
          height={200}
          width={300}
          className="h-auto w-[300px]"
        />
      </div>

      <div className="order-1 flex flex-col items-center text-center">
        <p className=" text-4xl font-semibold">{`${
          selectedAnime.title ??
          selectedAnime.title_english ??
          "Could not find title."
        }`}</p>
        <p className="font-bold text-muted-foreground">
          {selectedAnime.title_japanese}
        </p>
        <AnimeEpisodes selectedAnime={selectedAnime} />
      </div>
    </section>
  );
}

export default CurrentAnime;
