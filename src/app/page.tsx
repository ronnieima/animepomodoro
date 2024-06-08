import AnimeListSection from "../features/anime-list/components/AnimeListSection";
import TimerSection from "../features/timer/components/TimerSection";
import { AnimeSortOption, AnimeStatusOption } from "../config/content";

export default async function Home({ searchParams }: SearchParamsType) {
  return (
    <main>
      <TimerSection />
      <AnimeListSection searchParams={searchParams} />
    </main>
  );
}

export type SearchParamsType = {
  searchParams: {
    status: AnimeStatusOption;
    search: string;
    sort: AnimeSortOption;
    mode: "userlist" | "search";
  };
};
