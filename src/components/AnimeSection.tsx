import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";
import { ANIME_SORT_OPTIONS, ANIME_STATUS_OPTIONS } from "../config/content";
import AnimeCards from "./AnimeCards";
import AnimeFilter from "./AnimeFilter";
import Search from "./Search";
import SelectedAnime from "./SelectedAnime";

export default async function MALAuthenticatedSection({
  searchParams,
}: SearchParamsType) {
  const searchQuery = searchParams.search;
  const session = await getServerSession(options);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 py-4">
      <SelectedAnime />
      <div className="flex flex-col gap-8">
        <header className="flex flex-col items-center">
          <h2 className="self-start py-8 text-xl font-bold">
            {session ? `${session.user.name}'s anime list` : "Anime List"}
          </h2>
          {session ? (
            <div className="flex gap-4">
              <AnimeFilter
                key="status"
                label="Status"
                defaultValue={searchParams.status || "watching"}
                options={ANIME_STATUS_OPTIONS}
                queryParam="status"
              />
              <AnimeFilter
                key="sort"
                label="Sort"
                defaultValue="list_updated_at"
                options={ANIME_SORT_OPTIONS}
                queryParam="sort"
              />
            </div>
          ) : (
            <Search searchQuery={searchQuery} />
          )}
        </header>

        <AnimeCards searchParams={searchParams} />
      </div>
    </section>
  );
}
