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
  selectedAnime: Anime;
};

function AnimeEpisodes({ selectedAnime }: AnimeEpisodesType) {
  const dispatch = useDispatch();
  const { episodeCounts } = useSelector((state: RootState) => state.anime);
  return (
    <div className="flex items-center  gap-4">
      <Button
        variant={"ghost"}
        onClick={() => dispatch(decrementEpisodeCount(selectedAnime.mal_id))}
        className="text-destructive"
      >
        <Minus />
      </Button>
      <span className="text-xl">
        {episodeCounts[selectedAnime.mal_id]} of{" "}
        {selectedAnime?.episodes ?? <i>Unknown</i>}
      </span>
      <Button
        variant={"ghost"}
        onClick={() => dispatch(incrementEpisodeCount(selectedAnime.mal_id))}
        className="text-green-600"
      >
        <Plus />
      </Button>
    </div>
  );
}

export default AnimeEpisodes;
