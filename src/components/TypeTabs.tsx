"use client";

import { Button } from "@/src/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Music } from "lucide-react";
import { useBoundStore } from "../lib/zustand/bounded-store";
import ThemeToggle from "./ThemeToggle";

function TypeTabs() {
  const timerMode = useBoundStore((state) => state.timerMode);
  const updateTimerMode = useBoundStore((state) => state.updateTimerMode);
  const toggleMusicPlayerVisibility = useBoundStore(
    (state) => state.toggleMusicPlayerVisibility,
  );

  return (
    <Tabs
      defaultValue="pomodoro"
      className="flex w-full items-center justify-center gap-8 text-center"
      value={timerMode}
      onValueChange={(newMode) =>
        updateTimerMode(newMode as "pomodoro" | "animeBreak" | "longBreak")
      }
    >
      <TabsList>
        <TabsTrigger value="pomodoro" disabled>
          Work
        </TabsTrigger>
        <TabsTrigger value="animeBreak" disabled>
          Anime
        </TabsTrigger>
        <TabsTrigger value="longBreak" disabled>
          Long Break
        </TabsTrigger>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusicPlayerVisibility}
          className="h-full"
        >
          <Music className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          <span className="sr-only">Toggle music player</span>
        </Button>
      </TabsList>
    </Tabs>
  );
}

export default TypeTabs;
