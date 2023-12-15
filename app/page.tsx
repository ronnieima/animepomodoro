"use client";
import ThemeToggle from "@/app/_components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import Timer from "./_components/ui/Timer";
import TypeTags from "./_components/ui/TypeTabs";

export default function Home() {
  return (
    <>
      <nav>
        <ThemeToggle />
      </nav>
      <main className="flex flex-col items-center justify-center gap-16">
        <TypeTags />
        <Timer />
        <Button className="">{/* {isPlaying ? "Give up" : "Start"} */}</Button>
      </main>
    </>
  );
}
