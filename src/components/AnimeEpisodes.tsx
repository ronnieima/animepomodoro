import { Button } from "@/src/components/ui/button";
import { Anime } from "@tutkli/jikan-ts";
import { Minus, Plus } from "lucide-react";
import { useBoundStore } from "../lib/zustand/bounded-store";

type AnimeEpisodesType = {
  selectedAnime: Anime;
};

function AnimeEpisodes({ selectedAnime }: AnimeEpisodesType) {
  const episodeCounts = useBoundStore((state) => state.episodeCounts);
  const decrementEpisodeCount = useBoundStore(
    (state) => state.decrementEpisodeCount,
  );
  const incrementEpisodeCount = useBoundStore(
    (state) => state.incrementEpisodeCount,
  );

  return (
    <div>
      <p className="text-center text-lg">Episode</p>
      <div className="flex items-center  gap-4">
        <Button
          variant={"secondary"}
          onClick={() => decrementEpisodeCount(selectedAnime.mal_id)}
          className="text-destructive"
        >
          <Minus />
        </Button>
        <span className="text-xl">
          {episodeCounts[selectedAnime.mal_id]} of{" "}
          {selectedAnime?.episodes ?? <i>Unknown</i>}
        </span>
        <Button
          variant={"secondary"}
          onClick={() => incrementEpisodeCount(selectedAnime.mal_id)}
          className="text-green-600"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export default AnimeEpisodes;
