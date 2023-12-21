import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function AnimeCards() {
  const { page } = useSelector((state: RootState) => state.anime);

  async function fetchTopAnime() {
    const data = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const topAnimeList = await data.json();
    return topAnimeList;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["topAnime", { page: page }],
    queryFn: fetchTopAnime,
  });

  if (isLoading) {
    const skeletonArray = Array(25).fill(null);
    return (
      <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 py-16">
        {skeletonArray.map((_, index) => (
          <div key={index} className=" flex w-48 flex-col">
            <Skeleton
              height={300}
              width={200}
              duration={0.2}
              borderRadius={25}
            />
            <Skeleton
              height={20}
              width={200}
              count={2}
              duration={0.2}
              borderRadius={25}
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 py-16">
      {data?.data?.map((anime: Anime) => {
        return (
          <div key={anime.title}>
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={200}
              height={300}
            />

            <p className="w-48 text-center">{anime.title}</p>
          </div>
        );
      })}
    </section>
  );
}

export default AnimeCards;
