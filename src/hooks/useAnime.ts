import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { useBoundStore } from "../lib/zustand/bounded-store";
import useDebounce from "./useDebounce";

function useAnime() {
  const searchQuery = useBoundStore((state) => state.searchQuery);

  async function fetchAnime() {
    const data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10&sfw&order_by=favorites&sort=desc`,
    );
    const topAnimeList: JikanResponse<Anime[]> = await data.json();
    return topAnimeList;
  }

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const data = useQuery({
    queryKey: ["anime", debouncedSearchTerm],
    queryFn: fetchAnime,
    placeholderData: keepPreviousData,
  });
  return data;
}

export default useAnime;
