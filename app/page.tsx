"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <main className="flex flex-col items-center justify-center">
      <h1> Hi</h1>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={7}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      />
      <Button onClick={() => setIsPlaying(true)} className="">
        Start
      </Button>
    </main>
  );
}
