import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";
import AnimeCards from "./AnimeCards";
import LogInToMal from "./LogInToMal";
import SelectedAnime from "./SelectedAnime";
import SwitchModeButton from "./SwitchModeButton";
import AnimeFilter from "./AnimeFilter";
import { ANIME_SORT_OPTIONS, ANIME_STATUS_OPTIONS } from "../config/content";
import Search from "./Search";

export default async function MALAuthenticatedSection({
  searchParams,
}: SearchParamsType) {
  const session = await getServerSession(options);
  return (
    <section className="bg-[#121212]   py-4 md:p-16">
      <div className="mx-auto max-w-7xl py-8">
        <header className="flex flex-wrap items-center justify-center  gap-8 px-2 py-8 sm:justify-between">
          <div className="flex items-center gap-8">
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
          </div>
          {/* <SwitchModeButton /> */}
        </header>
        {session?.user ? (
          <div className=" flex  flex-col items-center gap-16 px-2 py-4">
            <SelectedAnime />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center py-8">
                <div className="flex flex-wrap items-center justify-center gap-4 px-4">
                  {/* {searchParams.mode === "userlist" ? ( */}
                  <>
                    <AnimeFilter
                      key="status"
                      label="Filter status"
                      defaultValue={"watching"}
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
                  </>
                  {/* ) : (
                    <>
                      <Search />
                    </>
                  )} */}
                </div>
              </div>

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
