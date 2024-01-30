"use client";
import useAnime from "@/src/hooks/useAnime";
import useDebounce from "@/src/hooks/useDebounce";
import { Anime } from "@tutkli/jikan-ts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBoundStore } from "../lib/zustand/bounded-store";
import AnimeCard from "./AnimeCard";

function AnimeCards() {
  const { data, isLoading } = useAnime();
  const setSelectedAnime = useBoundStore((state) => state.setSelectedAnime);
  const searchQuery = useBoundStore((state) => state.searchQuery);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  if (isLoading) {
    const skeletonArray = Array(10).fill(null);
    return (
      <div className="flex max-w-7xl flex-wrap justify-center gap-8">
        {skeletonArray.map((_, index) => (
          <div key={index} className=" flex w-48 flex-col">
            <Skeleton height={300} width={200} borderRadius={25} />
            <Skeleton height={20} width={200} count={2} borderRadius={25} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="flex flex-col items-start gap-4 py-16">
      <p>
        Showing results for:{" "}
        <span className="font-bold">{debouncedSearchTerm}</span>
      </p>
      <div className="flex max-w-7xl flex-wrap justify-center gap-8">
        {data?.data?.map((anime: Anime) => {
          return <div key={anime.mal_id}>A</div>;
        })}
      </div>
    </section>
  );
}

export default AnimeCards;
