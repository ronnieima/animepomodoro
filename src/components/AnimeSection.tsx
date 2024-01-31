import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import AnimeFilter from "./AnimeFilter";
import SelectedAnime from "./SelectedAnime";
import AnimeCardsAuthed from "./AnimeCardsAuthed";
import Search from "./Search";
import { Suspense } from "react";
import { getAnimeUnauthed } from "../app/actions";
import { SearchParamsType } from "../app/page";

export default async function MALAuthenticatedSection({
  searchParams,
}: SearchParamsType) {
  const status = searchParams.status;
  const searchQuery = searchParams.search;
  const session = await getServerSession(options);
  const animeList = await getAnimeUnauthed(searchQuery);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 py-4">
      <SelectedAnime />
      <div className="flex flex-col gap-16">
        <header className="flex flex-col items-center">
          <h2 className="self-start py-8 text-xl font-bold">Anime Search</h2>
          <div className="flex">
            <Search searchQuery={searchQuery} />
            <AnimeFilter searchParams={searchParams} />
          </div>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimeCardsAuthed animeList={animeList} />
        </Suspense>
      </div>
    </section>
  );
}
