import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function useAnime() {
  const { page, searchQuery } = useSelector((state: RootState) => state.anime);

  async function fetchAnime() {
    const data = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
    const topAnimeList = await data.json();
    return topAnimeList;
  }

  const data = useQuery({
    queryKey: ["anime"],
    queryFn: fetchAnime,
    staleTime: 0,
  });
  return data;
}

export default useAnime;
