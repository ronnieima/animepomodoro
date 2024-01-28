"use client";
import { useSession } from "next-auth/react";
import { setAnimeStatus } from "../app/actions";
import {
  ANIME_STATUS_OPTIONS,
  AnimeStatusValue,
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
import Image from "next/image";

export default function SelectedAnime() {
  const session = useSession();
  const selectedAnime = useBoundStore((state) => state.selectedAnime);
  const animeId = selectedAnime?.node?.id;
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
                  value={selectedAnime?.list_status?.status}
                  onValueChange={(newStatus: AnimeStatusValue) => {
                    setAnimeStatus(animeId!, newStatus);
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
                  defaultValue={
                    selectedAnime?.list_status?.num_episodes_watched || 0
                  }
                  type="number"
                  className="w-20"
                  min={0}
                />
                <span>/ 24</span>
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
