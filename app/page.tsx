"use client";
import Controls from "./_components/ui/Controls";
import Stats from "./_components/ui/Stats";
import ThemeToggle from "./_components/ui/ThemeToggle";
import Timer from "./_components/ui/Timer";
import TypeTabs from "./_components/ui/TypeTabs";

export default function Home() {
  return (
    <main className="flex h-full min-h-[100svh] flex-col items-center  justify-center gap-8">
      <ThemeToggle />
      <TypeTabs />
      <Timer />
      <Controls />
      <Stats />
    </main>
  );
}
