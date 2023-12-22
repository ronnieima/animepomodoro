import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useDebounce from "./useDebounce";
import { incrementPage, setPage } from "../features/anime/animeSlice";

function useAnime() {
  const { searchQuery, page } = useSelector((state: RootState) => state.anime);
  const dispatch = useDispatch();

  async function fetchAnime() {
    const data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10&page=${page}&sfw`,
    );
    const topAnimeList = await data.json();
    return topAnimeList;
  }

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const data = useQuery({
    queryKey: ["anime", debouncedSearchTerm, { page: page }],
    queryFn: fetchAnime,
    placeholderData: keepPreviousData,
  });
  return data;
}

export default useAnime;
