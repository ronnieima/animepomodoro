"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateAnimeStatus } from "../app/actions";
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

export default function SelectedAnime() {
  const session = useSession();
  const selectedAnime = useBoundStore((state) => state.selectedAnime);

  const animeId = selectedAnime?.node?.id;
  const currentAnimeStatus = selectedAnime?.list_status.status;

  const [animeStatus, setAnimeStatus] = useState(currentAnimeStatus);

  useEffect(() => {
    if (selectedAnime) {
      setAnimeStatus(selectedAnime.list_status.status);
    }
  }, [selectedAnime]);

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
                  defaultValue={animeStatus}
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
