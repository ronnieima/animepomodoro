import AnimeSection, { SearchParamsType } from "../components/AnimeSection";
import TimerSection from "../components/TimerSection";

export default async function Home({ searchParams }: SearchParamsType) {
  console.log(searchParams);
  return (
    <main>
      <TimerSection />
      <AnimeSection searchParams={searchParams} />
    </main>
  );
}
