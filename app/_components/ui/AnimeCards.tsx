import useAnime from "@/app/_hooks/useAnime";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnimeCards() {
  const { data, isLoading } = useAnime();
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
          <div key={anime.title}>
            {isLoading ? (
              <Skeleton height={300} width={200} borderRadius={25} />
            ) : (
              <Image
                src={anime.images.jpg.image_url}
                alt={anime.title}
                height={200}
                width={300}
                style={{ width: "200px", height: "auto" }}
              />
            )}

            <p className="w-48 text-center">{anime.title}</p>
          </div>
        );
      })}
    </section>
  );
}

export default AnimeCards;