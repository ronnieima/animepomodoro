"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import React from "react";
import {
  ANIME_STATUS_OPTIONS,
  USER_ANIME_SCORE_OPTIONS,
} from "../config/content";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useBoundStore } from "../lib/zustand/bounded-store";

export default function SelectedAnime() {
  const selectedAnime = useBoundStore((state) => state.selectedAnime);
  return (
    <>
      {selectedAnime ? (
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-center text-xl">{selectedAnime?.node.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div>
              <Label>Status</Label>
              <Select value={selectedAnime?.list_status.status}>
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
              <div className="flex items-center">
                <Input
                  value={selectedAnime.list_status.num_episodes_watched}
                  type="number"
                  className="w-20"
                  min={0}
                />
                <span>/ 24</span>
              </div>
            </div>
            <div>
              <Label>Your Score</Label>
              <Select value={selectedAnime?.list_status.score.toString()}>
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
        </div>
      ) : null}
    </>
  );
}
