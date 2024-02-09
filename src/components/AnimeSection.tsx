import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { options } from "../app/api/auth/[...nextauth]/options";
import { SearchParamsType } from "../app/page";
import AnimeCardsAuthed from "./AnimeCardsAuthed";
import AnimeFilter from "./AnimeFilter";
import Search from "./Search";
import SelectedAnime from "./SelectedAnime";
import ToggleMyAnimeList from "./ToggleMyAnimeList";

export default async function MALAuthenticatedSection({
  searchParams,
}: SearchParamsType) {
  const searchQuery = searchParams.search;
  const session = await getServerSession(options);
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 py-4">
      <SelectedAnime />
      <div className="flex flex-col gap-16">
        <header className="flex flex-col items-center">
          <h2 className="self-start py-8 text-xl font-bold">Anime Search</h2>
          <div className="flex">
            <Search searchQuery={searchQuery} />
            <ToggleMyAnimeList />
            <AnimeFilter searchParams={searchParams} />
          </div>
        </header>
        <AnimeCardsAuthed
          searchQuery={searchQuery}
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
