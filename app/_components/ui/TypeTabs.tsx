"use client";

import { updatecurrentStage } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { toggleMusicPlayerVisibility } from "@/app/features/music/musicPlayerSlice";
import { Music } from "lucide-react";

function TypeTabs() {
  const dispatch = useDispatch();
  const { currentStage } = useSelector((state: RootState) => state.timer);

  return (
    <Tabs
      defaultValue="pomodoro"
      className="flex w-full items-center justify-center gap-8 text-center"
      value={currentStage}
      onValueChange={(currentStage) =>
        dispatch(updatecurrentStage(currentStage))
      }
    >
      <TabsList>
        <TabsTrigger value="pomodoro" disabled>
          Work
        </TabsTrigger>
        <TabsTrigger value="anime" disabled>
          Anime
        </TabsTrigger>
        <TabsTrigger value="longBreak" disabled>
          Long Break
        </TabsTrigger>
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(toggleMusicPlayerVisibility())}
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
