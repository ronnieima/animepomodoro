import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import AnimeEpisodes from "./AnimeEpisodes";

type CurrentAnimeType = {
  selectedAnime: Anime;
};

function CurrentAnime({ selectedAnime }: CurrentAnimeType) {
  return (
    <section
      className="flex w-full flex-col items-center gap-4 pb-16"
      key={selectedAnime?.mal_id}
    >
      <div className="text-center">
        <span className="text-2xl font-light">Currently Watching: </span>
        <p className=" text-4xl font-semibold">{`${
          selectedAnime?.title ??
          selectedAnime?.title_english ??
          "Could not find title."
        }`}</p>
        <p className="font-bold text-muted-foreground">
          {selectedAnime?.title_japanese}
        </p>
      </div>

      <Image
        src={selectedAnime?.images.jpg.image_url}
        alt={selectedAnime?.title}
        height={200}
        width={300}
        className="h-auto w-[300px]"
      />
      <AnimeEpisodes selectedAnime={selectedAnime} />
    </section>
  );
}

export default CurrentAnime;
