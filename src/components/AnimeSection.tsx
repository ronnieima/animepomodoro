import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";
import { ANIME_SORT_OPTIONS, ANIME_STATUS_OPTIONS } from "../config/content";
import AnimeCards from "./AnimeCards";
import AnimeFilter from "./AnimeFilter";
import LogInToMal from "./LogInToMal";
import SelectedAnime from "./SelectedAnime";

export default async function MALAuthenticatedSection({
  searchParams,
}: SearchParamsType) {
  const session = await getServerSession(options);
  console.log(searchParams);
  return (
    <section className=" bg-[#121212] py-4 md:p-16">
      <div className="mx-auto max-w-7xl py-8">
        <header className="p flex items-center justify-center gap-8 px-2">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            My Anime List
          </h2>
          <Link
            href={`https://myanimelist.net/${
              session?.user?.name ? `animelist/${session?.user?.name}` : ""
            }`}
            target="_blank"
            title="Visit MyAnimeList"
          >
            <Image
              src="/MyAnimeList_Logo.png"
              height={50}
              width={50}
              alt="MyAnimeList Logo"
              className="rounded-lg transition-all hover:scale-105 active:translate-y-1"
            />
          </Link>
        </header>
        {session ? (
          <div className=" flex  flex-col items-center gap-16 px-8 py-4">
            <SelectedAnime />
            <div className="flex flex-col gap-8">
              <header className="flex flex-col items-center py-8">
                <div className="flex gap-4">
                  <AnimeFilter
                    key="status"
                    label="Filter status"
                    defaultValue={searchParams.status || "watching"}
                    options={ANIME_STATUS_OPTIONS}
                    queryParam="status"
                  />
                  <AnimeFilter
                    key="sort"
                    label="Sort by"
                    defaultValue="list_updated_at"
                    options={ANIME_SORT_OPTIONS}
                    queryParam="sort"
                  />
                </div>
              </header>

              <AnimeCards searchParams={searchParams} />
            </div>
          </div>
        ) : (
          <LogInToMal />
        )}
      </div>
    </section>
  );
}
