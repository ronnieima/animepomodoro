"use client";
import { fetchAnimeTotalEpisodes } from "@/src/app/actions";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  AnimeStatusOption,
  ANIME_STATUS_OPTIONS,
  USER_ANIME_SCORE_OPTIONS,
} from "@/src/config/content";
import { useBoundStore } from "@/src/lib/zustand/bounded-store";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SelectedAnime() {
  const session = useSession();
  const selectedAnime = useBoundStore((state) => state.selectedAnime);

  const initialAnimeStatus = selectedAnime?.list_status?.status;
  const initialEpisodeCount = selectedAnime?.list_status?.num_episodes_watched;
  const initialAnimeScore = selectedAnime?.list_status?.score;
  const [animeStatus, setAnimeStatus] = useState(initialAnimeStatus);
  const [episodeCount, setEpisodeCount] = useState(initialEpisodeCount);
  const [animeScore, setAnimeScore] = useState(initialAnimeScore);

  const [episodeCountOnFocus, setEpisodeCountOnFocus] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState();

  const animeId = selectedAnime?.node.id;

  useEffect(() => {
    async function fetchEps() {
      const eps = await fetchAnimeTotalEpisodes(animeId!);
      setTotalEpisodes(eps);
    }

    setAnimeStatus(initialAnimeStatus);
    setEpisodeCount(initialEpisodeCount);
    if (animeId) {
      fetchEps();
    }
  }, [
    selectedAnime,
    initialAnimeStatus,
    initialEpisodeCount,
    initialAnimeScore,
    animeId,
    session.status,
  ]);

  if (!selectedAnime || !animeId) return null;

  function updateAnimeDetails(
    animeId: any,
    arg1: string,
    newStatus: AnimeStatusOption,
  ) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {selectedAnime ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center ">
            <p className="text-muted-foreground">Currently Watching</p>
            <h2 className="text-center text-3xl font-semibold">
              {selectedAnime?.node.title}
            </h2>
          </div>
          <Image
            src={selectedAnime.node.main_picture?.large || "/no-image.png"}
            alt={selectedAnime.node.title}
            height={700}
            width={1000}
            className=" rounded-[2rem] "
            style={{ width: "200px", height: "auto" }}
          />
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            <div>
              <Label>Status</Label>
              <Select
                value={animeStatus}
                onValueChange={async (newStatus: AnimeStatusOption) => {
                  try {
                    await updateAnimeDetails(animeId, "status", newStatus);

                    setAnimeStatus(newStatus);

                    toast(`${selectedAnime.node.title} set to ${newStatus}.`, {
                      type: "success",
                    });
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {ANIME_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Episode</Label>
              <div className="flex w-full items-center gap-4">
                <Input
                  value={episodeCount}
                  onChange={(e) => {
                    setEpisodeCount(Number(e.target.value));
                  }}
                  onFocus={(e) => {
                    setEpisodeCountOnFocus(Number(e.target.value));
                  }}
                  onBlur={async () => {
                    if (episodeCount === episodeCountOnFocus) return;
                    try {
                      await updateAnimeDetails(
                        animeId,
                        "episodeCount",
                        episodeCount!.toString() as
                          | "watching"
                          | "completed"
                          | "on_hold"
                          | "dropped"
                          | "plan_to_watch",
                      );

                      toast(
                        `${selectedAnime.node.title}'s episode count updated to ${episodeCount}`,
                        { type: "success" },
                      );
                    } catch (error) {
                      throw error;
                    }
                  }}
                  type="number"
                  className="w-20"
                  min={0}
                />
                <span>/ {totalEpisodes}</span>
              </div>
            </div>

            <div>
              <Label>Your Score</Label>
              <Select
                value={animeScore?.toString()}
                onValueChange={async (newScore) => {
                  try {
                    await updateAnimeDetails(
                      animeId,
                      "score",
                      newScore as
                        | "watching"
                        | "completed"
                        | "on_hold"
                        | "dropped"
                        | "plan_to_watch",
                    );

                    setAnimeScore(Number(newScore));

                    toast(
                      `${selectedAnime.node.title}'s score updated to ${newScore}`,
                      { type: "success" },
                    );
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a score" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ANIME_SCORE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
        </div>
      ) : null}
    </>
  );
}
function useBoundStor(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}
