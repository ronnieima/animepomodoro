import {
  decrementEpisodeCount,
  incrementEpisodeCount,
} from "@/app/features/anime/animeSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Anime } from "@tutkli/jikan-ts";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

type AnimeEpisodesType = {
  selectedAnime: { anime: Anime; episodeCount: number };
};

function AnimeEpisodes({ selectedAnime }: AnimeEpisodesType) {
  const dispatch = useDispatch();
  const { episodeCount } = useSelector(
    (state: RootState) => state.anime.selectedAnime,
  );
  return (
    <div className="flex items-center  gap-4">
      <Button
        variant={"ghost"}
        onClick={() => dispatch(decrementEpisodeCount())}
        className="text-destructive"
      >
        <Minus />
      </Button>
      <span className="text-xl">
        {episodeCount} of {selectedAnime.anime?.episodes}
      </span>
      <Button
        variant={"ghost"}
        onClick={() => dispatch(incrementEpisodeCount())}
        className="text-green-600"
      >
        <Plus />
      </Button>
    </div>
  );
}

export default AnimeEpisodes;
