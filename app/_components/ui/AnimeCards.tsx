import useAnime from "@/app/_hooks/useAnime";
import { setSelectedAnime } from "@/app/features/anime/animeSlice";
import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";

function AnimeCards() {
  const { data, isLoading } = useAnime();
  const dispatch = useDispatch();

  if (isLoading) {
    const skeletonArray = Array(10).fill(null);
    return (
      <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 py-16">
        {skeletonArray.map((_, index) => (
          <div key={index} className=" flex w-48 flex-col">
            <Skeleton height={300} width={200} borderRadius={25} />
            <Skeleton height={20} width={200} count={2} borderRadius={25} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 py-16">
      {data?.data?.map((anime: Anime) => {
        return (
          <div
            key={anime.mal_id}
            onClick={() => dispatch(setSelectedAnime(anime))}
            className="w-32 hover:scale-105 hover:cursor-pointer active:translate-y-2 sm:w-48"
          >
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              height={200}
              width={300}
              style={{ width: "200px", height: "auto" }}
            />

            <p className="w-full text-center font-semibold">{anime.title}</p>
          </div>
        );
      })}
    </section>
  );
}

export default AnimeCards;
