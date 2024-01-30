"use client";
import { updateFilters } from "../app/actions";
import { ANIME_STATUS_OPTIONS, AnimeStatusValue } from "../config/content";
import { useBoundStore } from "../lib/zustand/bounded-store";
import { SearchParamsType } from "./AnimeSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AnimeFilter({ searchParams }: SearchParamsType) {
  return (
    <div className="flex items-center gap-8 ">
      <Select
        defaultValue={searchParams.status || "watching"}
        onValueChange={(status: AnimeStatusValue) => updateFilters(status)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ANIME_STATUS_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="flex gap-2"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
