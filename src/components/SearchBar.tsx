"use client";
import { Input } from "@/src/components/ui/input";
import { useBoundStore } from "../lib/zustand/bounded-store";

function SearchBar() {
  const searchQuery = useBoundStore((state) => state.searchQuery);
  const setSearchQuery = useBoundStore((state) => state.setSearchQuery);
  return (
    <Input
      className="h-16 w-full border-foreground text-2xl sm:w-[50%]"
      placeholder="Search anime"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;
