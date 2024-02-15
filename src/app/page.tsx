import MALAuthenticatedSection from "../components/AnimeSection";
import TimerSection from "../components/TimerSection";
import { AnimeSortOption, AnimeStatusOption } from "../config/content";

export default async function Home({ searchParams }: SearchParamsType) {
  return (
    <main className="bg-gradient-to-b from-neutral-800 to-neutral-900">
      <TimerSection />
      <MALAuthenticatedSection searchParams={searchParams} />
    </main>
  );
}

export type SearchParamsType = {
  searchParams: {
    status: AnimeStatusOption;
    search: string;
    sort: AnimeSortOption;
  };
};
