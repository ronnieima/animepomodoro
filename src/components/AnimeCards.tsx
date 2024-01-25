import useAnime from "@/src/hooks/useAnime";
import useDebounce from "@/src/hooks/useDebounce";
import { setSelectedAnime } from "@/src/app/features/anime/animeSlice";
import { RootState } from "@/src/app/store";
import { Anime } from "@tutkli/jikan-ts";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";

function AnimeCards() {
  const { data, isLoading } = useAnime();
  const { searchQuery } = useSelector((state: RootState) => state.anime);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
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
    <section className="flex flex-col items-start gap-4 py-16">
      <p>
        Showing results for:{" "}
        <span className="font-bold">{debouncedSearchTerm}</span>
      </p>
      <div className="flex max-w-7xl flex-wrap justify-center gap-8">
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
                className="shadow-xl"
                style={{ width: "200px", height: "auto" }}
              />

              <p className="w-full text-center font-semibold">{anime.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AnimeCards;
