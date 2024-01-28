"use client";
import useAnime from "@/src/hooks/useAnime";
import useDebounce from "@/src/hooks/useDebounce";
import { Anime } from "@tutkli/jikan-ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBoundStore } from "../lib/zustand/bounded-store";
import AnimeCard from "./AnimeCard";
import AnimeGridLayoutWrapper from "./AnimeGridLayoutWrapper";

function AnimeCards() {
  const { data, isLoading } = useAnime();
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);
  const searchQuery = useBoundStore((state) => state.searchQuery);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

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
              onClick={setSelectedAnime(anime)}
            />
          );
        })}
      </AnimeGridLayoutWrapper>
    </section>
  );
}

export default AnimeCards;
