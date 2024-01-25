import AnimeSection from "../components/AnimeSection";
import TimerSection from "../components/TimerSection";
import { generateRandomBase64String } from "../lib/utils";

export default async function Home() {
  return (
    <main>
      <TimerSection />
      <AnimeSection />
    </main>
  );
}
