"use client";
import { updateFilters } from "../app/actions";
import { ANIME_STATUS_OPTIONS, AnimeStatusValue } from "../config/content";
import { SearchParamsType } from "./AnimeSection";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AnimeFilter({ searchParams }: SearchParamsType) {
  return (
    <form className="flex items-center gap-8 ">
      <Select
        defaultValue={searchParams.status}
        onValueChange={(status: AnimeStatusValue) => updateFilters(status)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
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

      <Button>Apply filters</Button>
    </form>
  );
}
