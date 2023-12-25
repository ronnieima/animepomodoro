import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useDebounce from "./useDebounce";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";

function useAnime() {
  const { searchQuery } = useSelector((state: RootState) => state.anime);

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
