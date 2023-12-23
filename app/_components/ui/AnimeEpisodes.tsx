import { Anime } from "@tutkli/jikan-ts";

type AnimeEpisodesType = {
  selectedAnime: Anime;
};

function AnimeEpisodes({ selectedAnime }: AnimeEpisodesType) {
  return <div className="flex flex-wrap gap-8">{selectedAnime.episodes}</div>;
}

export default AnimeEpisodes;
