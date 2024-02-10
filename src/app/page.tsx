import MALAuthenticatedSection from "../components/AnimeSection";
import TimerSection from "../components/TimerSection";

export default async function Home({ searchParams }: SearchParamsType) {
  return (
    <main>
      <TimerSection />
      <MALAuthenticatedSection searchParams={searchParams} />
    </main>
  );
}

export type SearchParamsType = {
  searchParams: { status: string; search: string; sort: string };
};
