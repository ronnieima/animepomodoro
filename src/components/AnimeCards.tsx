import useAnime from "@/src/hooks/useAnime";
import useDebounce from "@/src/hooks/useDebounce";
import { setSelectedAnime } from "@/src/app/features/anime/animeSlice";
import { RootState } from "@/src/app/store";
import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import AnimeCard from "./AnimeCard";
import AnimeGridLayoutWrapper from "./AnimeGridLayoutWrapper";

function AnimeCards() {
  const { data, isLoading } = useAnime();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const dispatch = useDispatch();

  if (isLoading) {
    const skeletonArray = Array(10).fill(null);
    return (
      <AnimeGridLayoutWrapper>
        {skeletonArray.map((_, index) => (
          <div key={index} className=" flex w-48 flex-col">
            <Skeleton height={300} width={200} borderRadius={25} />
            <Skeleton height={20} width={200} count={2} borderRadius={25} />
          </div>
        ))}
      </AnimeGridLayoutWrapper>
    );
  }

  return (
    <section className="flex flex-col items-start gap-4 py-16">
      <p>
        Showing results for:{" "}
        <span className="font-bold">{debouncedSearchTerm}</span>
      </p>
      <AnimeGridLayoutWrapper>
        {data?.data?.map((anime: Anime) => {
          return (
            <AnimeCard
              animeTitle={anime.title}
              imageAlt={anime.title}
              imageSrc={anime.images.jpg.image_url}
              key={anime.mal_id}
              onClick={() => dispatch(setSelectedAnime(anime))}
            />
          );
        })}
      </AnimeGridLayoutWrapper>
    </section>
  );
}

export default AnimeCards;
