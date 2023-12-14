"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ThemeToggle from "@/app/_components/ui/ThemeToggle";
import TypeTags from "./_components/ui/TypeTabs";

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  return (
    <div className="timer">
      <div className="text-6xl font-semibold">{remainingTime}</div>
    </div>
  );
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [key, setKey] = useState(0);

  return (
    <>
      <nav>
        <ThemeToggle />
      </nav>
      <main className="flex flex-col items-center justify-center gap-16">
        <TypeTags />
        <CountdownCircleTimer
          onComplete={() => {
            setIsPlaying(false);
            return { shouldRepeat: false };
          }}
          isPlaying={isPlaying}
          size={360}
          duration={23}
          strokeWidth={32}
          colors="#004777"
        >
          {renderTime}
        </CountdownCircleTimer>
        <Button onClick={() => setIsPlaying(true)} className="">
          {isPlaying ? "Give up" : "Start"}
        </Button>
      </main>
    </>
  );
}
