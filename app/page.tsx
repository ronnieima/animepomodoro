"use client";
import { Anime } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import Controls from "./_components/ui/Controls";
import Stats from "./_components/ui/Stats";
import ThemeToggle from "./_components/ui/ThemeToggle";
import Timer from "./_components/ui/Timer";
import TypeTabs from "./_components/ui/TypeTabs";
import Image from "next/image";

export default function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>();

  useEffect(() => {
    async function fetchTopAnime() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime");
        const topAnimeList = await res.json();
        setAnimeList(topAnimeList.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchTopAnime();
  }, []);
  console.log(animeList);
  return (
    <main className=" h-full min-h-[100svh] ">
      <section className="flex flex-col items-center  justify-center gap-8 py-48">
        <ThemeToggle />
        <TypeTabs />
        <Timer />
        <Controls />
        <Stats />
      </section>
      <section className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 py-32">
        {animeList?.map((anime) => {
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
    </main>
  );
}
