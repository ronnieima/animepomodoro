"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAnimeTotalEpisodes, updateAnimeStatus } from "../app/actions";
import {
  ANIME_STATUS_OPTIONS,
  AnimeStatusOption,
  USER_ANIME_SCORE_OPTIONS,
} from "../config/content";
import { useBoundStore } from "../lib/zustand/bounded-store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useDebounce from "../hooks/useDebounce";

export default function SelectedAnime() {
  const session = useSession();
  const selectedAnime = useBoundStore((state) => state.selectedAnime);
  const animeId = selectedAnime?.node.id;

  const initialAnimeStatus = selectedAnime?.list_status.status;
  const initialEpisodeCount = selectedAnime?.list_status.num_episodes_watched;

  const [episodeCountOnFocus, setEpisodeCountOnFocus] = useState(0);
  const [animeStatus, setAnimeStatus] = useState(initialAnimeStatus);
  const [episodeCount, setEpisodeCount] = useState(initialEpisodeCount);
  const [totalEpisodes, setTotalEpisodes] = useState();

  useEffect(() => {
    async function fetchEps() {
      const eps = await fetchAnimeTotalEpisodes(animeId!);
      setTotalEpisodes(eps.num_episodes);
    }
    setAnimeStatus(initialAnimeStatus);
    setEpisodeCount(initialEpisodeCount);
    fetchEps();
  }, [selectedAnime, initialAnimeStatus, initialEpisodeCount, animeId]);

  if (!selectedAnime || !animeId) return null;

  return (
    <>
      {selectedAnime ? (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-xl">{selectedAnime?.node.title}</h2>
            <Image
              src={selectedAnime.node.main_picture?.large || "/no-image.png"}
              alt={selectedAnime.node.title}
              height={700}
              width={1000}
              className="shadow-xl"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            {session.status === "authenticated" ? (
              <div>
                <Label>Status</Label>
                <Select
                  value={animeStatus}
                  onValueChange={async (newStatus: AnimeStatusOption) => {
                    try {
                      await updateAnimeStatus(animeId!, newStatus);

                      setAnimeStatus(newStatus);

                      toast(
                        `${selectedAnime.node.title} set to ${newStatus}.`,
                        { type: "success" },
                      );
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
            ) : null}

            <div>
              <Label>Episode</Label>
              <div className="flex items-center">
                <Input
                  value={episodeCount}
                  onChange={(e) => {
                    const newEpisodeCount: number = Number(e.target.value);
                    setEpisodeCount(newEpisodeCount);
                  }}
                  onFocus={(e) => {
                    setEpisodeCountOnFocus(Number(e.target.value));
                  }}
                  onBlur={() => {
                    if (episodeCount === episodeCountOnFocus) return;
                    try {
                      updateAnimeStatus(animeId, Number(episodeCount));

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

            {session.status === "authenticated" ? (
              <div>
                <Label>Your Score</Label>
                <Select
                  value={selectedAnime?.list_status?.score.toString() || "0"}
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
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
